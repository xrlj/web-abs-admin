import {Injectable} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {Constants} from './constants';
import {AppPath} from '../app-path';
import {Utils} from './utils';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UIHelper {
  constructor(private utils: Utils, private router: Router, private message: NzMessageService, private notification: NzNotificationService) {}

  /**
   * 返回。相当按下浏览器返回按钮。
   */
  goBack() {
    // history.go(-1);
    history.back();
  }

  /**
   * 操作成功提醒UI。
   * @param content 提醒内容
   */
  msgTipSuccess(content: string): void {
    this.message.create('success', content);
  }

  /**
   * 操作失败提醒UI。
   * @param content 提醒内容。
   */
  msgTipError(content: string): void {
    this.message.create('error', content);
  }

  /**
   * 操作警告提醒UI。
   * @param content 提醒内容。
   */
  msgTipWarning(content: string): void {
    this.message.create('warning', content);
  }

  /**
   * 成功，右上角通知。
   * @param title 标题。
   * @param content 通知内容。
   */
  notificationSuccess(title: string, content: string): void {
    this.notification.create('success', title, content);
  }

  /**
   * 错误，右上角通知。
   * @param title 标题。
   * @param content 通知内容。
   */
  notificationError(title: string, content: string): void {
    this.notification.create('error', title, content);
  }

  /**
   * 警告，右上角通知。
   * @param title 标题。
   * @param content 通知内容。
   */
  notificationWarning(title: string, content: string): void {
    this.notification.create('warning', title, content);
  }

  /**
   * 未登录或者已失效,跳转到登录。
   */
  verifyLoginAndJumpToLogin() {
    const authToken = localStorage.getItem(Constants.localStorageKey.token);
    if (!authToken || this.utils.jwtTokenIsExpired(authToken)) { // 未登录或者已失效
      this.router.navigateByUrl(AppPath.login);
    }
  }

  /**
   * 已经登录，且登录未失效。跳转到首页。
   */
  verifyLoginAndJumpToHome() {
    const authToken = localStorage.getItem(Constants.localStorageKey.token);
    if (authToken && !this.utils.jwtTokenIsExpired(authToken)) { // 已登录且未失效
      this.router.navigateByUrl(AppPath.pages);
    } else {
      localStorage.clear();
    }
  }
}
