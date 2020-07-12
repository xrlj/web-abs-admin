import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MenuManageService} from './menu-manage.service';
import {Utils} from '../../../helpers/utils';
import {JwtKvEnum} from '../../../helpers/enum/jwt-kv-enum';
import {UIHelper} from '../../../helpers/ui-helper';
import {VMenuResp} from '../../../helpers/vo/resp/v-menu-resp';
import {NzModalService} from 'ng-zorro-antd/modal';
import {CommonService} from '../../../helpers/common.service';
import {VAppInfoResp} from '../../../helpers/vo/resp/v-app-info-resp';
import {EventBusService} from '../../../helpers/event-bus/event-bus.service';
import {VMenuReq} from '../../../helpers/vo/req/v-menu-req';

@Component({
  selector: 'app-menu-manage',
  templateUrl: './menu-manage.component.html',
  styleUrls: ['./menu-manage.component.less']
})
export class MenuManageComponent implements OnInit {

  appSelected: any;
  appDataList: VAppInfoResp[];

  // ===新增、编辑对话框相关
  isShowAdd = false;
  dialogType = 1; // 1-新增；2-修改
  isAddOkLoading = false;
  addMenuForm: FormGroup;
  radioValue = 'A';

  menuDetails: VMenuResp;

  menuList: VMenuResp[];
  menuListOfExpandedData: { [key: string]: VMenuResp[] } = {};
  isRefreshMenuList = false;

  /*=======新增菜单对话的菜单类型选择=======*/
  selectMenuKey: any;
  selectMenuId: string;
  selectMenu: VMenuResp;
  selectMenuList: VMenuResp[];

  constructor(private menuManageService: MenuManageService,
              private utils: Utils, private uiHelper: UIHelper,
              private fb: FormBuilder, private modalService: NzModalService,
              private commonService: CommonService) {
    this.initAddMenuDialog();
  }

  ngOnInit() {
    this.initData();
  }

  /**
   * 获取应用选择列表。
   */
  initData() {
    this.commonService.getAllAppList(0).ok((data) => {
      this.appDataList = data;
      if (this.appDataList.length > 0) {
        this.appSelected = this.appDataList[0].appId;
      }

      this.getMenuByClientId(0);
    }).fail((error) => {
      console.log(`获取应用列表失败:${error.code}`);
    });
  }

  /**
   * 刷新菜单列表。
   */
  refreshMenuList() {
    this.getMenuByClientId(0);
  }

  /**
   * 获取菜单列表。
   * @param type 菜单类型。
   */
  getMenuByClientId(type: number) {
    if (!this.appSelected) {
      this.uiHelper.msgTipWarning('请先选择应用系统');
      return;
    }
    this.isRefreshMenuList = true;
    this.menuManageService.getMenusByClientId(this.appSelected, type)
      .ok(data => {
        this.menuList = data;
        this.dealMenuList(this.menuList);
        this.menuList.forEach((val) => {
          this.menuListOfExpandedData[val.key] = this.convertTreeToList(val);
        });
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(() => {
        this.isRefreshMenuList = false;
      });
  }

  /**
   * 递归列表，把子菜单为空的对象设置为 null。
   * @param menuList 菜单列表。
   */
  dealMenuList(menuList: VMenuResp[]) {
    menuList.every((val, index, Array) => {
      if (!val.children || val.children.length === 0) {
        val.children = null;
      } else {
        this.dealMenuList(val.children);
      }
      return true;
    });
  }

  /**
   * 初始化新增编辑对话框。
   */
  initAddMenuDialog() {
    // 新增对话框
    this.addMenuForm = this.fb.group({
      menuName: [null, [Validators.required]],
      parentMenu: [null, null],
      isShow: [null, [Validators.required]],
      routerPath: [null, null],
      sortNumber: [null, [Validators.required]],
      menuPermission: [null, null],
      icon: [null, null]
    });
  }

  /**
   * 新增菜单。
   */
  addMenu(): void {
    if (!this.appSelected) {
      this.uiHelper.msgTipWarning('请先选择应用系统');
      return;
    }
    this.isShowAdd = true;
    // 获取上级菜单选择列表
    this.menuManageService.getMenusByClientId(this.appSelected, 1).ok(data => {
        this.selectMenuList = data;
        this.dealMenuList(this.selectMenuList);
        // this.setSelectMenuLeaf();
        this.uiHelper.setMenuPerDataLeaf(this.selectMenuList);
      }).fail(error => {
    });
  }

  addMenuForCurrent(menuId: string): void {
    if (!this.appSelected) {
      this.uiHelper.msgTipWarning('请先选择应用系统');
      return;
    }
    this.isShowAdd = true;
    this.menuManageService.getMenuById(menuId)
      .ok(data => {
        // 设置上级菜单下拉
        this.menuManageService.getMenusByClientId(this.appSelected, 1)
          .ok(data1 => {
          this.selectMenuList = data1;
          this.dealMenuList(this.selectMenuList);
          this.getMenuById(data.id, this.selectMenuList);
          if (this.selectMenu) {
            this.selectMenuKey = this.selectMenu.key;
          }
          this.uiHelper.setMenuPerDataLeaf(this.selectMenuList);
        }).fail(error => {
        });
      }).fail(error => {
    });
  }

  /**
   * 编辑菜单。
   */
  editMenu(menuId: string) {
    this.isShowAdd = true;
    this.dialogType = 2;
    this.menuManageService.getMenuById(menuId)
      .ok(data => {
        this.menuDetails = data;
        if (this.menuDetails.type === 1) { // 菜单
          this.radioValue = 'A';
        } else { // 按钮
          this.radioValue = 'B';
        }
        this.addMenuForm.patchValue({
          menuName: this.menuDetails.title,
          routerPath: this.menuDetails.link,
          sortNumber: this.menuDetails.sort,
          menuPermission: this.menuDetails.perms,
          icon: this.menuDetails.icon
        });
        // 设置上级菜单下拉
        this.menuManageService.getMenusByClientId(this.appSelected, 1).ok(data1 => {
            this.selectMenuList = data1;
            this.dealMenuList(this.selectMenuList);
            this.getMenuById(this.menuDetails.parentId, this.selectMenuList);
            if (this.selectMenu) {
              this.selectMenuKey = this.selectMenu.key;
            }
            this.uiHelper.setMenuPerDataLeaf(this.selectMenuList);
          }).fail(error => {
        });
      }).fail(error => {
    });
  }

  /**
   * 根据id在树结构中查找到整个对象。
   * @param id 菜单id。
   * @param menuList 菜单树形列表。
   */
  getMenuById(id: string, menuList: VMenuResp[]) {
    if (menuList && menuList.length > 0) {
      menuList.every(value => {
        if (value.id === id) {
          this.selectMenu = value;
          return false;
        } else {
          if (value.children && value.children.length > 0) {
            this.getMenuById(id, value.children);
          }
        }
        return true;
      });
    }
  }

  /**
   * 根据菜单key获取菜单id。
   * @param key menuKey
   */
  getSelectMenuIdByKey(menuList: VMenuResp[]): string {
    if (menuList && menuList.length > 0) {
      menuList.every((item) => {
        if (item.key === this.selectMenuKey) {
          this.selectMenuId = item.id;
          return false;
        } else {
          if (item.children && item.children.length > 0) {
            this.getSelectMenuIdByKey(item.children);
          }
        }
        return true;
      });
    }
    return this.selectMenuId;
  }

  delMenu(menuId: string, name: string) {
    /*this.uiHelper.modalConfirm(`确定要删除[${name}]菜单吗？`).ok(() => {
      console.log('调用接口做实际删除');
      this.menuManageService.delMenuById(menuId)
        .ok(data => {
          if (data) {
            this.refreshMenuList();
          }
        })
        .fail(error => {
          this.uiHelper.msgTipError(error.msg);
        });
    });*/

    this.modalService.confirm({
      nzTitle: '删除提示',
      nzContent: `确定要删除[${name}]菜单吗？`,
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.menuManageService.delMenuById(menuId)
          .ok(data => {
            if (data === true) {
              setTimeout(() => {
                this.refreshMenuList();
                }, 200);
            } else {
              this.uiHelper.msgTipError('删除菜单失败');
            }
          })
          .fail(error => {
            this.uiHelper.msgTipError(error.msg);
          });
      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  /**
   * 新增、编辑确定提交
   */
  handleOk(): void {
    this.isAddOkLoading = true;
    const body: VMenuReq = {
      type: this.radioValue === 'A' ? 1 : 2,
      title: this.addMenuForm.value.menuName,
      isShow: this.addMenuForm.value.isShow === '1' ? true : false,
      link: this.addMenuForm.value.routerPath,
      sort: this.addMenuForm.value.sortNumber,
      perms: this.addMenuForm.value.menuPermission,
      icon: this.addMenuForm.value.icon,
      id: this.menuDetails ? this.menuDetails.id : null,
      clientId: this.appSelected,
      parentId: this.getSelectMenuIdByKey(this.selectMenuList)
    };
    this.menuManageService.saveOrUpdate(body).ok((data) => {
      if (data && data !== '') {
        this.uiHelper.msgTipSuccess('提交成功');
        this.isShowAdd = false;
        this.resetInit();
        // 200毫秒后再刷新，服务端数据库主从复制有延迟，可能数据不一致，因此延迟1s再刷新。
        setTimeout(() => {
          this.refreshMenuList();
        }, 200);
      } else {
        this.uiHelper.msgTipError('提交失败');
      }
    }).fail((error) => {
        this.uiHelper.msgTipError(error.msg);
    }).final(() => {
      this.isAddOkLoading = false;
    });
  }

  /**
   * 取消新增对话框
   */
  handleCancel(): void {
    this.resetInit();
  }

  /**
   * 重新初始化各个值和控件。
   */
  resetInit() {
    this.dialogType = 1;
    this.isShowAdd = false;
    this.isAddOkLoading = false;
    this.radioValue = 'A';
    this.menuDetails = null;
    this.selectMenuList = null;
    this.selectMenuKey = null;
    this.selectMenu = null;
    this.selectMenuId = null;
    this.resetAddMenuDialog();
  }

  selectAddMenuType(b: boolean) {
    console.log(b);
  }

  /**
   * 重置新增菜单对话框中表单内容。
   */
  resetAddMenuDialog() {
    this.addMenuForm.reset();
    this.radioValue = 'A';
  }

  /**
   * 新增菜单表单选择上级菜单回调。
   * @param $event 事件。
   */
  onChange($event: string): void {
    console.log($event);
    console.log(this.selectMenuKey);
    console.log(this.addMenuForm.value.parentMenu);
  }

  collapse(array: VMenuResp[], data: VMenuResp, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          // tslint:disable-next-line:no-non-null-assertion
          const target = array.find(a => a.key === d.key)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: VMenuResp): VMenuResp[] {
    const stack: VMenuResp[] = [];
    const array: VMenuResp[] = [];
    const hashMap = {};
    stack.push({...root, level: 0, expand: false});

    while (stack.length !== 0) {
      // tslint:disable-next-line:no-non-null-assertion
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          // tslint:disable-next-line:no-non-null-assertion
          stack.push({...node.children[i], level: node.level! + 1, expand: false, parent: node});
        }
      }
    }

    return array;
  }

  visitNode(node: VMenuResp, hashMap: { [key: string]: boolean }, array: VMenuResp[]): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }

  getMenuShowTagColorNo(): string {
    const currentTheme = this.uiHelper.getCurrentTheme();
    let color = 'geekblue';
    switch (currentTheme) {
      case 'orange':
        color = 'lime';
        break;
      case 'turquoise':
        color = '';
        break;
    }
    return  color;
  }

  getMenuShowTagColorYes(): string {
    const currentTheme = this.uiHelper.getCurrentTheme();
    let color = 'blue';
    switch (currentTheme) {
      case 'orange':
        color = 'orange';
        break;
      case 'turquoise':
        color = 'cyan';
        break;
    }
    return  color;
  }

}
