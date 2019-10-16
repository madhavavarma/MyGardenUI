import { LogEntry } from '../models/log-entry.model';
import { Observable, of } from 'rxjs';
import { LogPublisher } from './logpublisher';
import { LogLevel } from '../enums/log-level.enum';

export class LogConsole extends LogPublisher {
    log(entry: LogEntry): Observable<boolean> {
        // Log to console

        const msg = entry.buildLogString();

        switch (entry.level) {
            case LogLevel.Debug:
                console.debug(msg);
                break;
            case LogLevel.Info:
                console.info(msg);
                break;
            case LogLevel.Warn:
                console.warn(msg);
                break;
            case LogLevel.Error:
                console.error(msg);
                break;
            case LogLevel.Fatal:
                console.log('%c' + msg, 'color: #fff; background: red;');
                break;

        }

        return of(true);
    }
    clear(): Observable<boolean> {
        console.clear();
        return of(true);
    }
}
