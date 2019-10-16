import { Injectable } from '@angular/core';
import { LogLevel } from '../enums/log-level.enum';
import { LogEntry } from '../models/log-entry.model';
import { LogPublisher } from '../publishers/logpublisher';
import { LogPublishersService } from './logpublisher.service';

@Injectable({
    providedIn: 'root'
})
export class LogService {

    level: LogLevel = LogLevel.All;
    logWithDate = true;
    publishers: LogPublisher[];

    constructor(private publishersService: LogPublishersService) {
        this.publishers = publishersService.publishers;
    }

    debug(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Debug, optionalParams);
    }
    info(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Info, optionalParams);
    }
    warn(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Warn, optionalParams);
    }
    error(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Error, optionalParams);
    }
    fatal(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Fatal, optionalParams);
    }
    log(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.All, optionalParams);
    }

    private shouldLog(level: LogLevel): boolean {
        let ret = false;
        if ((level >= this.level &&
            level !== LogLevel.Off) ||
            this.level === LogLevel.All) {
            ret = true;
        }
        return ret;
    }

    private writeToLog(msg: string, level: LogLevel, params: any[]) {
        if (this.shouldLog(level)) {
            const entry: LogEntry = new LogEntry();
            entry.message = msg;
            entry.level = level;
            entry.extraInfo = params;
            entry.logWithDate = this.logWithDate;

            for (const logger of this.publishers) {
                logger.log(entry);
              }
        }
    }
}
