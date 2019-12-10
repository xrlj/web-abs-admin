import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MenuManageService} from './menu-manage.service';
import {Utils} from '../../../helpers/utils';
import {JwtKvEnum} from '../../../helpers/enum/jwt-kv-enum';
import {UIHelper} from '../../../helpers/ui-helper';
import {VMenuResp} from '../../../helpers/vo/resp/v-menu-resp';

@Component({
  selector: 'app-menu-manage',
  templateUrl: './menu-manage.component.html',
  styleUrls: ['./menu-manage.component.less']
})
export class MenuManageComponent implements OnInit {

  constructor(private menuManageService: MenuManageService, private utils: Utils, private uiHelper: UIHelper, private fb: FormBuilder) { }

  // ===新增对话框相关
  isShowAdd = false;
  isAddOkLoading = false;
  addMenuForm: FormGroup;
  radioValue = 'A';

  menuList: VMenuResp[];
  menuListOfExpandedData: { [key: string]: VMenuResp[] } = {};

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
    this.getMenuByClientId();
    this.initAddMenuDialog();
  }

  getMenuByClientId() {
    this.menuManageService.getMenusByClientId(this.utils.getJwtTokenClaim(JwtKvEnum.ClientId))
      .ok(data => {
        this.menuList = data;
        console.log(this.menuList);
        this.menuList.forEach(item => {
          this.menuListOfExpandedData[item.key] = this.convertTreeToList(item);
        });
      }).fail(error => {
        this.uiHelper.msgTipError(error.msg);
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
    /*setTimeout(() => {
      this.value = '1001';
    }, 1000);*/
  }

  /**
   * 显示新增对话框
   */
  showAddMenuModal(): void {
    this.isShowAdd = true;
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
