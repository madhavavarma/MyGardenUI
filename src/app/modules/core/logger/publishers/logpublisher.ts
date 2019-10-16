import { Observable } from 'rxjs';
import { LogEntry } from '../models/log-entry.model';

export abstract class LogPublisher {
    location: string;
    abstract log(record: LogEntry): Observable<boolean>;
    abstract clear(): Observable<boolean>;
}
