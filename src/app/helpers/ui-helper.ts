import {Injectable} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class UIHelper {
  constructor(private message: NzMessageService, private notification: NzNotificationService) {}

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
}
