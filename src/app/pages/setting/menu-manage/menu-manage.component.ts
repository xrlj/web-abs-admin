import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MenuManageService} from './menu-manage.service';
import {Utils} from '../../../helpers/utils';
import {JwtKvEnum} from '../../../helpers/enum/jwt-kv-enum';
import {UIHelper} from '../../../helpers/ui-helper';
import {VMenuResp} from '../../../helpers/vo/resp/v-menu-resp';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-menu-manage',
  templateUrl: './menu-manage.component.html',
  styleUrls: ['./menu-manage.component.less']
})
export class MenuManageComponent implements OnInit {

  constructor(private menuManageService: MenuManageService, private utils: Utils, private uiHelper: UIHelper, private fb: FormBuilder, private modalService: NzModalService) { }

  // ===新增对话框相关
  isShowAdd = false;
  dialogType = 1; // 1-新增；2-修改
  isAddOkLoading = false;
  addMenuForm: FormGroup;
  radioValue = 'A';

  menuList: VMenuResp[];
  menuListOfExpandedData: { [key: string]: VMenuResp[] } = {};
  isRefreshMenuList = false;

    /*=======新增菜单对话的菜单类型选择=======*/
  value: any;
  nodes: VMenuResp[];

  ngOnInit() {
    this.getMenuByClientId(0);
    this.initAddMenuDialog();
  }

  refreshMenuList() {
    this.isRefreshMenuList = true;
    this.getMenuByClientId(0);
  }

  /**
   * 根据菜单列表。
   * @param type 菜单类型。
   */
  getMenuByClientId(type: number) {
    this.menuManageService.getMenusByClientId(this.utils.getJwtTokenClaim(JwtKvEnum.ClientId), type)
      .ok(data => {
        this.menuList = data;
        this.menuList.forEach((val, index, array) => {
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
          this.menuListOfExpandedData[val.key] = this.convertTreeToList(val);
        });
        debugger;
        console.log(this.menuList);
      }).fail(error => {
        this.uiHelper.msgTipError(error.msg);
    }).final(() => {
      this.isRefreshMenuList = false;
    });
  }

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
   * 显示新增对话框
   */
  showAddMenuModal(type: number): void {
    this.dialogType = type;
    this.isShowAdd = true;
    // 设置上级菜单选择列表
    this.menuManageService.getMenusByClientId(this.utils.getJwtTokenClaim(JwtKvEnum.ClientId), 1)
      .ok(data => {
        this.nodes = data;
        this.nodes.forEach(item => {
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
        console.log(this.nodes);
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
