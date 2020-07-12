import {Injectable} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {Constants} from './constants';
import {AppPath} from '../app-path';
import {Utils} from './utils';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import {VMenuResp} from './vo/resp/v-menu-resp';
import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd';
import {VDeptResp} from './vo/resp/v-dept-resp';
import {UserStatusEnum} from './enum/user-status-enum';

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

  /**
   * 删除对话框。
   * @param content 删除提醒内容。
   * @param title 标题。
   */
  modalDel(content: string, title?: string) {
    const handlers = {};
    this.modalService.confirm({
      nzTitle: title ? title : '删除提示',
      nzContent: content,
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => {
        new Promise((resolve, reject) => {
          const ok = handlers['ok'];
          if (ok instanceof Function) {
            ok();
          }
        }).catch(() => console.log('操作错误!'));
      },
      nzCancelText: '取消',
      nzOnCancel: () => {
        console.log('cancel');
        const cancel = handlers['cancel'];
        if (cancel instanceof Function) {
          cancel();
        }
      }
    });
    const result = {
      ok: fn => {
        handlers['ok'] = fn;
        return result;
      },
      cancel: fn => {
        handlers['cancel'] = fn;
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
      localStorage.clear();
      this.router.navigateByUrl(AppPath.login);
    }
  }

  /**
   * 已经登录，且登录未失效。跳转到首页。
   */
  verifyLoginAndJumpToHome() {
    const authToken = localStorage.getItem(Constants.localStorageKey.token);
    if (authToken) { // 已登录
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

  /**
   * 通用方法，所有选择树可以。递归遍历树节点。当节点没有子节点的时候，添加isLeaf=true。目的，去掉箭头展开按钮。
   * @param dataList 整棵树数据列表。
   */
  setSelectTreeLeaf(dataList: any): void {
    if (!dataList) {
      return;
    }
    dataList.forEach(value => {
      const children = value.children;
      if (children === null || children === undefined || children.length === 0) {
        value.isLeaf = true;
      } else {
        this.setSelectTreeLeaf(children);
      }
    });
  }

  /**
   * 通用方法。递归收集树选择（checked）的key以及对象id。注意去重。在多选树中的checked回调方法中调用改该方法。
   * @param node 节点。
   * @param checkedKeys 保存的选中key。注意去重
   * @param checkIds 保存的选中对象的id。包括父节点的。注意去重
   */
  dealNzTreeCheck(node: NzTreeNode, checkedKeys: string[], checkIds: string[]): void {
    if (!node) {
      return;
    }
    let parentNode = node.parentNode;
    const childrenNode = node.children;
    checkedKeys.push(node.origin.key);
    checkIds.push(node.origin.id);
    while (parentNode) { // 向上找到所有父节点
      const pKey = parentNode.origin.key;
      if (parentNode.origin.checked) {
        checkedKeys.push(pKey);
      }
      checkIds.push(parentNode.origin.id);
      parentNode = parentNode.getParentNode();
    }
    if (childrenNode && childrenNode.length > 0) { // 向下找到所有子节点
      childrenNode.forEach(value => {
        if (value.origin.checked) {
          checkedKeys.push(value.origin.key);
        }
        checkIds.push(value.origin.id);
        this.dealNzTreeCheck(value, checkedKeys, checkIds);
      });
    }
  }

  /**
   * TreeSelect，选择树，选定后根据key，获取节点对象中包含的id。通用
   * @param dataList 整棵树数据列表。
   * @param selectedKey 选定的节点的key
   */
  getSelectTreeIdByKey(dataList: any, selectedKey: string, selectedId: string): void {
    if (dataList && dataList.length > 0) {
      dataList.every((item) => {
        if (item.key === selectedKey) {
          selectedId = item.id;
          return false;
        } else {
          if (item.children && item.children.length > 0) {
            this.getSelectTreeIdByKey(item.children, selectedKey, selectedId);
          }
        }
        return true;
      });
    }
  }

  /**
   * 设置不同状态下。不同颜色样式显示。
   * @param status 状态。
   */
  setEtpStatusNameColor(status: number): string {
    let color = '';
    switch (status) {
      case UserStatusEnum.BLACK:
        color = 'red';
        break;
      case UserStatusEnum.DISABLE:
        color = 'red';
        break;
      case UserStatusEnum.CHECK_FAILURE:
        color = 'red';
        break;
      case UserStatusEnum.CHECK_PASS:
        color = 'green';
        break;
      case UserStatusEnum.VERIFIED_PASS:
        color = 'green';
        break;
      default:
        color = 'gray';
        break;
    }
    return color;
  }

  /**
   * 保存当前主题字符串。
   * @param currentTheme 选定的当前主题，默认为default
   */
  storageCurrentTheme(currentTheme: string): void {
    localStorage.setItem('currentTheme', currentTheme);
  }

  /**
   * 获取当前设定的主题。
   */
  getCurrentTheme(): string {
    const currentTheme = localStorage.getItem('currentTheme');
    return currentTheme;
  }
}
