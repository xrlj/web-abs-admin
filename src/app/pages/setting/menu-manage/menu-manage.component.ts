import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MenuManageService} from './menu-manage.service';
import {Utils} from '../../../helpers/utils';
import {JwtKvEnum} from '../../../helpers/enum/jwt-kv-enum';
import {UIHelper} from '../../../helpers/ui-helper';
import {VMenuResp} from '../../../helpers/vo/resp/v-menu-resp';
import {NzModalService} from 'ng-zorro-antd/modal';
import {CommonService} from '../../../helpers/common.service';
import {VAppInfoResp} from '../../../helpers/vo/resp/v-appInfo-resp';
import {EventBusService} from '../../../helpers/event-bus/event-bus.service';

@Component({
  selector: 'app-menu-manage',
  templateUrl: './menu-manage.component.html',
  styleUrls: ['./menu-manage.component.less']
})
export class MenuManageComponent implements OnInit {

  constructor(private menuManageService: MenuManageService,
              private utils: Utils, private uiHelper: UIHelper,
              private fb: FormBuilder, private modalService: NzModalService,
              private commonService: CommonService) { }

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
  selectMenuList: VMenuResp[];

  ngOnInit() {
    this.initAddMenuDialog();
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
    this.isRefreshMenuList = true;
    this.getMenuByClientId(0);
  }

  /**
   * 获取菜单列表。
   * @param type 菜单类型。
   */
  getMenuByClientId(type: number) {
    this.menuManageService.getMenusByClientId(this.appSelected, type)
      .ok(data => {
        this.menuList = data;
        this.dealMenuList(this.menuList);
        this.menuList.forEach((val, index, array) => {
          this.setMenuKey(val, index);
          this.menuListOfExpandedData[val.key] = this.convertTreeToList(val);
        });
      }).fail(error => {
        this.uiHelper.msgTipError(error.msg);
    }).final(() => {
      this.isRefreshMenuList = false;
    });
  }

  /**
   * 设置菜单key。最多四级。
   * @param val 菜单对象
   * @param index 下标
   */
  private setMenuKey(val: VMenuResp, index: number) {
    val.key = index + 1; // 一级
    if (val.children && val.children.length > 0) {
      val.children.forEach((val1, index1, array1) => {
        val1.key = val.key * 10 + index1 + 1; // 二级
        if (val1.children && val1.children.length > 0) {
          val1.children.forEach((val11, index11, array11) => {
            val11.key = val1.key * 10 + index11 + 1; // 三级
            if (val11.children && val11.children.length > 0) {
              val11.children.forEach((val111, index111, array111) => {
                val111.key = val11.key * 10 + index111 + 1; // 四级
              });
            }
          });
        }
      });
    }
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
    this.isShowAdd = true;
    // 获取上级菜单选择列表
    this.setSelectMenuList();
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
        this.setSelectMenuList();
      })
      .fail(error => {});
  }

  /**
   * 设置新增，编辑对话中选择上级菜单列表。
   */
  setSelectMenuList() {
    this.menuManageService.getMenusByClientId(this.appSelected, 1)
      .ok(data => {
        this.selectMenuList = data;
        this.dealMenuList(this.selectMenuList);
        this.selectMenuList.forEach((item, index, array) => {
          this.setMenuKey(item, index);
          if (item.children) {
            item.children.forEach(item2 => {
              if (item2.children) {
                item2.children.forEach(item3 => {
                  if (item3.children) {
                  } else {
                    item3.isLeaf = true;
                  }
                });
              } else {
                item2.isLeaf = true;
              }
            });
          } else {
            item.isLeaf = true;
          }
        });
      })
      .fail(error => {});
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
            if (data) {
              this.refreshMenuList();
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
   * 新增对话框确定提交
   */
  handleOk(): void {
    this.isAddOkLoading = true;
    setTimeout(() => {
      this.isShowAdd = false;
      this.isAddOkLoading = false;
    }, 3000);
  }

  /**
   * 取消新增对话框
   */
  handleCancel(): void {
    this.isShowAdd = false;
    this.radioValue = 'A';
    this.menuDetails = null;
    this.selectMenuList = null;
    this.selectMenuKey = null;
    this.dialogType = 1;
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
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level! + 1, expand: false, parent: node });
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

}
