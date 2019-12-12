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
  expandKeys = ['100', '1001'];
  value: any;
  nodes = [
    {
      title: 'parent 1',
      key: '100',
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          children: [
            { title: 'leaf 1-0-0', key: '10010', isLeaf: true },
            { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
          ]
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }]
        }
      ]
    }
  ];

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
        this.menuList.forEach(item => {
          this.menuListOfExpandedData[item.key] = this.convertTreeToList(item);
        });
        this.isRefreshMenuList = false;
      }).fail(error => {
        this.uiHelper.msgTipError(error.msg);
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
    /*this.menuManageService.getMenusByClientId(this.utils.getJwtTokenClaim(JwtKvEnum.ClientId), 1)
      .ok(data => {
        this.nodes = data;
      })
      .fail(error => {});*/
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
