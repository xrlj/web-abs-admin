import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * 整个应用的事件总线。父组件与子孙组件整个组件家族双向通讯。
 */
@Injectable({
  providedIn: 'root'
})
export class DefaultBusService {

  // 监测是否显示对话框。
  private loadingSpin = new Subject<boolean>();
  loadingSpin$ = this.loadingSpin.asObservable();

  // 是否显示加载等待对话框
  showLoading(isLoading: boolean) {
    this.loadingSpin.next(isLoading);
  }
}
