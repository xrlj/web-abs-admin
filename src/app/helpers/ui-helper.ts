import {Injectable} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {Constants} from './constants';
import {AppPath} from '../app-path';
import {Utils} from './utils';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import {VMenuResp} from './vo/resp/v-menu-resp';

@Injectable({
  providedIn: 'root'
})
export class UIHelper {
  constructor(private utils: Utils, private router: Router, private message: NzMessageService, private notification: NzNotificationService, private modalService: NzModalService) {}

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

  // =================== 各种通用对话框 start ==================== //

  /**
   * 普通提示对话框。点击确定按钮会回调。
   * @param content 提示内容。
   * @param title 标题。
   */
  modalInfo(content: string, title?: string): any {
    const handlers = {};
    this.modalService.info({
      nzTitle: title === undefined ? '提示' : title,
      nzContent: content,
      nzOnOk: () => {
        const ok = handlers['ok'];
        if (ok instanceof Function) {
          ok();
        }
      }
    });
    const result = {
      ok: fn => {
        handlers['ok'] = fn;
        return result;
      }
    };
    return result;
  }

  modalSuccess(content: string, title?: string) {
    this.modalService.success({
      nzTitle: title === undefined ? '成功提示' : title,
      nzContent: content
    });
  }

  /**
   * 警告对话框。
   * @param content 内容
   * @param title 标题
   */
  modalWarning(content: string, title?: string) {
    this.modalService.warning({
      nzTitle: title === undefined ? '警告提示' : title,
      nzContent: content
    });
  }

  modalError(content: string, title?: string) {
    this.modalService.error({
      nzTitle: title === undefined ? '错误提示' : title,
      nzContent: content
    });
  }

  modalConfirm(content: string, title?: string) {
    const handlers = {};
    this.modalService.confirm({
      nzTitle: title === undefined ? '确认提示' : title,
      nzContent: content,
      nzOnOk: () => {
        new Promise((resolve, reject) => {
          // console.log(reject);
          // console.log(reject);
          // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          const ok = handlers['ok'];
          if (ok instanceof Function) {
            ok();
          }
        }).catch(() => console.log('操作错误!'));
      }
    });
    const result = {
      ok: fn => {
        handlers['ok'] = fn;
        return result;
      }
    };
    return result;
  }

  // =================== 各种通用对话框 end ==================== //

  /**
   * 未登录或者已失效,跳转到登录。
   */
  verifyLoginAndJumpToLogin() {
    const authToken = localStorage.getItem(Constants.localStorageKey.token);
    if (!authToken || this.utils.jwtTokenIsExpired()) { // 未登录或者已失效
      this.router.navigateByUrl(AppPath.login);
    }
  }

  /**
   * 已经登录，且登录未失效。跳转到首页。
   */
  verifyLoginAndJumpToHome() {
    const authToken = localStorage.getItem(Constants.localStorageKey.token);
    if (authToken && !this.utils.jwtTokenIsExpired()) { // 已登录且未失效
      this.router.navigateByUrl(AppPath.pages);
    } else {
      localStorage.clear();
    }
  }

  /**
   * 递归遍历菜单树。当节点没有子节点的时候，添加isLeaf=true。目的，去掉箭头展开按钮。
   * @param data 菜单节点数据。
   */
  setMenuPerDataLeaf(data: VMenuResp[]): void {
    if (!data) {
      return;
    }
    data.forEach(value => {
      const children = value.children;
      if (children === null || children === undefined || children.length === 0) {
        value.isLeaf = true;
      } else {
        this.setMenuPerDataLeaf(children);
      }
    });
  }
}
