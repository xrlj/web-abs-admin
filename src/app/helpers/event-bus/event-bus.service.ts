import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * 整个应用的事件总线。父组件与子孙组件整个组件家族双向通讯。
 */
@Injectable({
  providedIn: 'root'
})
export class EventBusService {
}
