import {Component, OnInit} from '@angular/core';
import {VUserReq} from '../../../helpers/vo/req/v-user-req';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Observer} from '_rxjs@6.4.0@rxjs';
import {NzFormatEmitEvent} from 'ng-zorro-antd';
import {DepartmentService} from '../department-manage/department.service';
import {UIHelper} from '../../../helpers/ui-helper';
import {Utils} from '../../../helpers/utils';
import {JwtKvEnum} from '../../../helpers/enum/jwt-kv-enum';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.less']
})
export class UserManageComponent implements OnInit {

  // 查询
  username: string;
  sexSelected: number;

  userInfo: VUserReq;

  // 新增编辑对话框
  addOrEditForm: FormGroup;
  isShowAddOrEditModal = false;
  modalType = 1; // 1-新增；2-编辑
  isModalOkLoading = false;

  // 部门搜索对话框
  isShowDeptSearchModal = false;
  deptSearchValue = '';
  deptSelectedId = '';
  deptDataList = [];

  constructor(private fb: FormBuilder, private departmentService: DepartmentService,
              private uiHelper: UIHelper, private utils: Utils) {
    // 新增编辑对话框
    this.addOrEditForm = this.fb.group({
      username: [null, [Validators.required], [this.userNameAsyncValidator]],
      dept: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirm: [null, [this.confirmValidator]],
      realName: [null, [Validators.required]],
      sex: ['1', null], // 性别选择。1-男；2-女；0-保密
      email: [null, [Validators.email]],
      mobile: [null, [Validators.maxLength(11)]],
      role: [null, null],
      status: ['1', null] // 用户状态。-1=停用；1-正常
    });
  }

  ngOnInit() {
  }

  resetAddOrEditModal(): void {
    this.addOrEditForm.reset();
    this.isShowAddOrEditModal = false;
    this.isModalOkLoading = false;
    this.addOrEditForm.patchValue({sex: '1'});
    this.addOrEditForm.patchValue({status: '1'});
  }

  search(): void {}

  addModalShow(): void {
    this.modalType = 1;
    this.isShowAddOrEditModal = true;
  }

  handleCancel(modalType: number): void {
    this.resetAddOrEditModal();
  }

  handleOk(modalType: number, value: any): void {
    for (const key in this.addOrEditForm.controls) {
      this.addOrEditForm.controls[key].markAsDirty();
      this.addOrEditForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log(this.addOrEditForm.dirty);
    if (!this.addOrEditForm.dirty) { // 前端通过所有输入校验
    }
  }

  /**
   * 检查用户名
   */
  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
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

  deptClickEvent(event: NzFormatEmitEvent): void {
    console.log('>>>>>>>>>deptClickEvent');
    console.log(event);
    if (event.node.origin.selected) {
      this.deptSelectedId = event.node.origin.id;
      this.addOrEditForm.patchValue({dept: event.node.origin.title});
      this.deptSearchHandleCancel();
      console.log(this.deptSelectedId);
    }
  }

}
