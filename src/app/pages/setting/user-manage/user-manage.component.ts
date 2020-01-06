import {Component, OnInit} from '@angular/core';
import {VUserReq} from '../../../helpers/vo/req/v-user-req';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Observer} from '_rxjs@6.4.0@rxjs';
import {NzFormatEmitEvent} from 'ng-zorro-antd';
import {DepartmentService} from '../department-manage/department.service';
import {UIHelper} from '../../../helpers/ui-helper';
import {Utils} from '../../../helpers/utils';
import {JwtKvEnum} from '../../../helpers/enum/jwt-kv-enum';
import {RoleManageService} from '../role-manage/role-manage.service';
import {VRoleResp} from '../../../helpers/vo/resp/v-role-resp';
import {UserManageService} from './user-manage.service';
import {VUserSearchReq} from '../../../helpers/vo/req/v-user-search-req';
import {UserStatusEnum} from '../../../helpers/enum/user-status-enum';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import {VUserResp} from '../../../helpers/vo/resp/v-user-resp';
import {UserSexEnum} from '../../../helpers/enum/user-sex-enum';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.less']
})
export class UserManageComponent implements OnInit {

  userStatus: typeof  UserStatusEnum = UserStatusEnum; // 用户状态
  userSexEnum: typeof  UserSexEnum = UserSexEnum; // 用户性别

  // 表格
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: VUserResp[] = [];
  listOfAllData: VUserResp[] = []; // 列表数据
  mapOfCheckedId: { [key: string]: boolean } = {}; // 记录选择角色
  numberOfChecked = 0;
  loading = false;
  pageIndex = 1;
  pageSize = 10;
  total = 0;
  // 查询
  vUserSearchReq: VUserSearchReq = {pageIndex: this.pageIndex, pageSize: this.pageSize};

  // 新增编辑对话框
  addOrEditForm: FormGroup;
  isShowAddOrEditModal = false;
  modalType = 1; // 1-新增；2-编辑
  isModalOkLoading = false;

  // 部门搜索对话框
  isShowDeptSearchModal = false;
  deptSearchValue = '';
  deptSelectedId = null;
  deptDataList = [];

  // 部门下角色
  roleList: VRoleResp[] = [];

  constructor(private fb: FormBuilder, private departmentService: DepartmentService,
              private uiHelper: UIHelper, private utils: Utils,
              private roleManageService: RoleManageService, private userManageService: UserManageService,
              private defaultBusService: DefaultBusService) {
    // 新增编辑对话框
    this.addOrEditForm = this.fb.group({
      username: [null, [Validators.required], [this.userNameAsyncValidator]],
      deptId: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirm: [null, [this.confirmValidator]],
      realName: [null, [Validators.required]],
      sex: ['1', null], // 性别选择。1-男；2-女；0-保密
      email: [null, [Validators.email]],
      mobile: [null, [Validators.required]],
      roleId: [null, null],
      status: ['1', null] // 用户状态。0=停用；1-正常
    });
  }

  ngOnInit() {
    this.search();
  }

  /**
   * 重新初始化。
   */
  resetAddOrEditModal(): void {
    this.addOrEditForm.reset();
    this.isShowAddOrEditModal = false;
    this.isModalOkLoading = false;
    this.addOrEditForm.patchValue({sex: '1'});
    this.addOrEditForm.patchValue({status: '1'});
  }

  search(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.userManageService.getEtpUsers(this.vUserSearchReq)
      .ok(data => {
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

  setUserStatusNameColor(status: number): string {
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

  addModalShow(): void {
    this.modalType = 1;
    this.isShowAddOrEditModal = true;
  }

  handleCancel(modalType: number): void {
    this.resetAddOrEditModal();
  }

  /**
   * 保存或编辑用户。
   */
  handleOk(): void {
    if (this.addOrEditForm.valid) { // 前端通过所有输入校验
      this.isModalOkLoading = true;
      // 表单参数
      const par: VUserReq = {
        username: this.addOrEditForm.value.username,
        deptId: this.deptSelectedId,
        password: this.addOrEditForm.value.password,
        sex: this.addOrEditForm.value.sex,
        realName: this.addOrEditForm.value.realName,
        email: this.addOrEditForm.value.email,
        mobile: this.addOrEditForm.value.mobile,
        roleId: this.addOrEditForm.value.roleId,
        status: this.addOrEditForm.value.status
      };
      if (this.modalType === 1) { // 新增
        this.userManageService.addSystemUser(par)
          .ok(data => {
            if (data) {
              this.uiHelper.msgTipSuccess('保存成功');
              this.resetAddOrEditModal();
              setTimeout(() => {
                this.search();
              }, 100);
            } else {
              this.uiHelper.msgTipError('保存失败');
            }
          }).fail(error => {
            this.uiHelper.msgTipError(error.msg);
        }).final((b) => {
          this.isModalOkLoading = false;
        });
      } else { // 编辑
      }
    } else {
      for (const key in this.addOrEditForm.controls) {
        this.addOrEditForm.controls[key].markAsDirty();
        this.addOrEditForm.controls[key].updateValueAndValidity();
      }
    }
  }

  /**
   * 检查用户名。频繁请求，代价高昂。//TODO 需要做请求抖动处理
   */
  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      this.userManageService.exitUsername(control.value)
        .ok(data => {
          if (data) {
            observer.next({ error: true, duplicated: true });
          } else {
            observer.next(null);
          }
        }).fail(error => {
        observer.next(null);
      }).final(() => {
        observer.complete();
      });
    })

  /**
   * 校验密码
   */
  validateConfirmPassword(): void {
    setTimeout(() => this.addOrEditForm.controls.confirm.updateValueAndValidity());
  }

  /**
   * 确认前后密码是否一致。
   */
  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.addOrEditForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  /**
   * 搜索并选定部门。
   */
  showDeptSearchModal(): void {
    this.isShowDeptSearchModal = true;
    this.departmentService.getAll(this.utils.getJwtTokenClaim(JwtKvEnum.EnterpriseId))
      .ok(data => {
        this.deptDataList = data;
        this.uiHelper.setSelectTreeLeaf(this.deptDataList);
      });
  }

  deptSearchHandleCancel(): void {
    this.isShowDeptSearchModal = false;
    this.deptDataList = [];
    this.deptSearchValue = '';
  }

  deptSearchEvent(event: NzFormatEmitEvent): void {
    console.log('>>>>>>>>>deptSearchEvent');
    console.log(event);
  }

  /**
   * 选择部门。
   * @param event 选择对象。
   */
  deptClickEvent(event: NzFormatEmitEvent): void {
    if (event.node.origin.selected) {
      this.deptSelectedId = event.node.origin.id;
      this.addOrEditForm.patchValue({deptId: event.node.origin.title});
      this.deptSearchHandleCancel();
      console.log(this.deptSelectedId);

      // 获取部门角色
      this.roleManageService.getAllRoleByDeptId(this.deptSelectedId)
        .ok(data => {
          this.roleList = data;
        });
    }
  }

  editRole(id: string): void {
  }

  /**
   * 删除角色。
   * @param id 角色id
   */
  delRole(id?: string, name?: string): void {
    const checkIds: string[] = []; // 待删除角色
    for (const key in this.mapOfCheckedId) {
      if (this.mapOfCheckedId[key]) {
        checkIds.push(key);
      }
    }
    if (checkIds.length === 0) {
      this.uiHelper.msgTipWarning('请选择用户!');
      return;
    }
    this.defaultBusService.showLoading(true);
    this.uiHelper.modalDel(`确定删除角色${name ? `[${name}]` : ''}?`)
      .ok(() => {
        this.userManageService.delUser(checkIds)
          .ok(data => {
            if (data) {
              this.uiHelper.msgTipSuccess('批量删除用户成功！');
              setTimeout(() => {
                this.search();
              }, 100);
            } else {
              this.uiHelper.modalError('删除用户失败');
            }
          }).fail(error => {
            this.uiHelper.msgTipError(error.msg);
        }).final(() => {
          this.defaultBusService.showLoading(false);
        });
      });
  }

  showSetUserRole(): void {
  }

  /**
   * 审核用户。
   */
  checkUser(userId: string): void {
    this.updateUserStatus(userId, UserStatusEnum.CHECK_PASS);
  }

  /**
   * 启用用户账号。
   */
  enableUser(userId: string, accoutId: string): void {
    let newStatus;
    if (accoutId) { // 已经实名认证过
      newStatus = UserStatusEnum.VERIFIED_PASS;
    } else {
      newStatus = UserStatusEnum.CHECK_PASS;
    }
    this.updateUserStatus(userId, newStatus);
  }

  /**
   * 用户解除黑名单
   */
  rmUserBlack(userId: string, accoutId: string): void {
    let newStatus;
    if (accoutId) { // 已经实名认证过
      newStatus = UserStatusEnum.VERIFIED_PASS;
    } else {
      newStatus = UserStatusEnum.CHECK_PASS;
    }
    this.updateUserStatus(userId, newStatus);
  }

  /**
   * 拉黑用户。
   */
  addUserBlack(userId: string): void {
    this.updateUserStatus(userId, UserStatusEnum.BLACK);
  }

  /**
   * 禁用用户账号。
   */
  disableUser(userId: string): void {
    this.updateUserStatus(userId, UserStatusEnum.DISABLE);
  }

  /**
   * 更改用户状态。审核、启用、禁用，拉黑
   * @param id 用户id
   * @param status 用户状态
   */
  updateUserStatus(userId: string, status: number): void {
    this.defaultBusService.showLoading(true);
    this.userManageService.updateUserStatus(userId, status)
      .ok(data => {
        if (data) {
          this.uiHelper.msgTipSuccess('请求成功!');
          setTimeout(() => {
            this.search();
          }, 100);
        } else {
          this.uiHelper.msgTipError('请求失败!');
        }
      }).fail(error => {
        this.uiHelper.msgTipError(error.msg);
    }).final(() => {
      this.defaultBusService.showLoading(false);
    });
  }

  /**
   * 表格数据更改时候设定选择信息。保持选择或者取消
   * @param $event 选择事件
   */
  currentPageDataChange($event: VUserResp[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  /**
   * 表格刷新选择信息。
   */
  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.userId]);
    this.isIndeterminate =
      this.listOfDisplayData.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.userId]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.userId]).length;
  }

  /**
   * 选择所有。
   * @param value 选择事件
   */
  checkAll(value: boolean): void {
    this.listOfDisplayData.filter(item => !item.disabled).forEach(item => (this.mapOfCheckedId[item.userId] = value));
    this.refreshStatus();
  }

}
