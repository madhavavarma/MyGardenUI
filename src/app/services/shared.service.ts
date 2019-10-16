import { Injectable } from '@angular/core';
import { LogService } from '../modules/core/logger/services/log.service';
import { LayoutService } from '../modules/layout/state/layout.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    public logService: LogService,
    public layoutService: LayoutService) { }
}
