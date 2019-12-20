import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonService} from '../../../helpers/common.service';
import {VAppInfoResp} from '../../../helpers/vo/resp/v-appInfo-resp';
import {Utils} from '../../../helpers/utils';
import {JwtKvEnum} from '../../../helpers/enum/jwt-kv-enum';
import {RoleManageService} from './role-manage.service';
import {VRoleReq} from '../../../helpers/vo/req/v-role-req';
import {UIHelper} from '../../../helpers/ui-helper';
import {VRoleMenuResp, VRoleResp} from '../../../helpers/vo/resp/v-role-resp';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions} from 'ng-zorro-antd';
import {MenuManageService} from '../menu-manage/menu-manage.service';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import {VMenuResp} from '../../../helpers/vo/resp/v-menu-resp';

@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.less']
})
export class RoleManageComponent implements OnInit {

  constructor(private commonService: CommonService, private utils: Utils,
              private roleManageService: RoleManageService, private uiHelper: UIHelper,
              private fb: FormBuilder, private menuManageService: MenuManageService,
              private defaultBusService: DefaultBusService) {
  }

  // 搜索条件
  appSelected: string = this.utils.getJwtTokenClaim(JwtKvEnum.ClientId);
  appDataList: VAppInfoResp[];
  roleName: string | null;

  // 表格
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: VRoleResp[] = [];
  listOfAllData: VRoleResp[] = []; // 列表数据
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;
  loading = false;
  pageIndex = 1;
  pageSize = 10;
  total = 0;

  // 新增、编辑对话框
  isShowDialog = false;
  dialogType = 1; // 1-新增；2-编辑
  isAddOkLoading = false;
  addOrEditForm: FormGroup;
  @ViewChild('nzTreeComponent', { static: false }) nzTreeComponent: NzTreeComponent;
  checkedKeys = ['1', '22']; // 选中的key
  checkedMenuIds = []; // 选中的菜单的id
  expandedKeys = []; // 展开的
  nzTreeMenusData: VMenuResp[] = [];

  // 详情
  roleInfo: VRoleResp;

  ngOnInit() {
    // 新增编辑对话框
    this.addOrEditForm = this.fb.group({
      roleName: [null, [Validators.required]],
      roleDesc: [null, [Validators.required]]
    });
    this.getAppList();
    this.search();
  }

  reInitDialog(): void {
    this.addOrEditForm.reset();
    this.dialogType = 1;
    this.checkedKeys = [];
    this.expandedKeys = [];
    this.checkedMenuIds = [];
    this.nzTreeMenusData = [];
  }

  nzTreeMenusClick(event: NzFormatEmitEvent): void {
    console.log('>>>click');
    console.log(event);
  }

  /**
   * 选中菜单。
   * @param event 对象
   */
  nzTreeMenusCheck(event: NzFormatEmitEvent): void {
    console.log(event);
    if (event.checkedKeys) {
      console.log(event.checkedKeys);
      this.checkedKeys = [];
      this.checkedMenuIds = [];
      event.checkedKeys.forEach(value => {
        this.uiHelper.dealNzTreeCheck(value, this.checkedKeys, this.checkedMenuIds);
      });
      // 去重
      this.checkedKeys = this.utils.removeRepeatOfArray<string>(this.checkedKeys);
      this.checkedMenuIds = this.utils.removeRepeatOfArray<string>(this.checkedMenuIds);
      console.log(this.checkedKeys);
      console.log(this.checkedMenuIds);
    }
  }

  /**
   * 添加角色。
   */
  addRole(): void {
    this.dialogType = 1;
    this.isShowDialog = true;
    this.menuManageService.getMenusByClientId(this.appSelected, 0).ok(data => {
      this.nzTreeMenusData = data;
      this.uiHelper.setMenuPerDataLeaf(this.nzTreeMenusData);
    }).fail(error => {
      console.error(error.code);
      this.uiHelper.msgTipError('加载授权菜单失败');
    }).final(() => {
    });
  }

  /**
   * 编辑修改角色。
   * @param id 角色id
   */
  editRole(id: string): void {
    this.dialogType = 2;
    this.defaultBusService.showLoading(true);
    this.roleManageService.getRoleInfo(id)
      .ok(data => {
        this.isShowDialog = true;
        this.roleInfo = data;
        this.addOrEditForm.patchValue({
          roleName: this.roleInfo.roleName,
          roleDesc: this.roleInfo.description
        });
        // 设置菜单授权
        this.menuManageService.getMenusByClientId(this.appSelected, 0)
          .ok(data1 => {
            this.nzTreeMenusData = data1;
            // 设置选中
            this.checkedKeys = [];
            this.roleInfo.roleMenu.forEach(value => {
              if (value.checked) {
                this.checkedKeys.push(value.menuKey);
              }
              this.checkedMenuIds.push(value.menuId);
            });
            this.uiHelper.setMenuPerDataLeaf(this.nzTreeMenusData);
            console.log(this.checkedKeys);
            console.log(this.checkedMenuIds);
          })
          .fail(error1 => {
            this.uiHelper.msgTipError('加载授权菜单失败');
          })
          .final(b => {
          });
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.defaultBusService.showLoading(false);
      });
  }

  /**
   * 单个删除角色。
   * @param id 角色id
   */
  delRoleSingle(id: string): void {
  }

  /**
   * 确定新增或编辑角色。提交表单数据。
   * @param dialogType 1-新增；2-修改
   */
  handleOkDialog(dialogType: number): void {
    // 检查必填值
    for (const i in this.addOrEditForm.controls) {
      this.addOrEditForm.controls[i].markAsDirty();
      this.addOrEditForm.controls[i].updateValueAndValidity();
    }
    const vRoleReq: VRoleReq = {
      clientId: this.appSelected,
      roleName: this.addOrEditForm.value.roleName,
      description: this.addOrEditForm.value.roleDesc,
      menuIds: this.checkedMenuIds,
      roleId: this.roleInfo.id
    };
    this.isAddOkLoading = true;
    if (dialogType === 1) { // 新增
      this.roleManageService.saveRole(vRoleReq).ok(data => {
        this.uiHelper.msgTipSuccess('添加角色成功');
        this.isShowDialog = false;
        this.reInitDialog();
        setTimeout(() => {
          this.search();
        }, 100);
      })
        .fail(error => {
          this.uiHelper.msgTipError(error.msg);
        })
        .final(b => {
          this.isAddOkLoading = false;
        });
    } else { // 修改
      this.roleManageService.updateRole(vRoleReq)
        .ok(data => {
          if (data) {
            this.uiHelper.msgTipSuccess('修改成功');
            this.isShowDialog = false;
            this.reInitDialog();
            setTimeout(() => {
              this.search();
            }, 100);
          }
        })
        .fail(error => {
          this.uiHelper.msgTipError(error.msg);
        })
        .final(b => {
          this.isAddOkLoading = false;
        });
    }
  }

  /**
   * 取消新增或者编辑。
   * @param dialogType 1-新增；2-修改
   */
  handleCancelDialog(dialogType: number): void {
    this.isShowDialog = false;
    this.reInitDialog();
  }

  /**
   * 获取应用列表。
   */
  getAppList() {
    this.commonService.getAllAppList(0).ok((data) => {
      this.appDataList = data;
      // 默认选定本系统的
      this.appDataList.every(value => {
        if (value.appId === this.utils.getJwtTokenClaim(JwtKvEnum.ClientId)) {
          this.appSelected = value.appId;
          return false;
        }
        return true;
      });
    }).fail((error) => {
      console.log(`获取应用列表失败:${error.code}`);
      this.appSelected = this.utils.getJwtTokenClaim(JwtKvEnum.ClientId);
    });
  }

  /**
   * 搜索列表。
   * @param reset 是否重置列表。第一页
   */
  search(reset: boolean = false): void {
    const body: VRoleReq = {
      pageIndex: reset ? 1 : this.pageIndex,
      pageSize: this.pageSize,
      clientId: this.appSelected,
      roleName: this.roleName
    };
    this.loading = true;
    this.roleManageService.getRolePage(body).ok(data => {
      this.pageIndex = data.pageIndex;
      this.pageSize = data.pageSize;
      this.total = data.total;
      this.listOfAllData = data.list;
    }).fail(error => {
      this.uiHelper.msgTipError(error.msg);
    }).final(() => {
      this.loading = false;
    });
  }

  /**
   * 表格数据更改时候设定选择信息。保持选择或者取消
   * @param $event 选择事件
   */
  currentPageDataChange($event: VRoleResp[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  /**
   * 刷新选择信息。
   */
  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.id]).length;
  }

  /**
   * 选择所有。
   * @param value 选择事件
   */
  checkAll(value: boolean): void {
    this.listOfDisplayData.filter(item => !item.disabled).forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }
}
