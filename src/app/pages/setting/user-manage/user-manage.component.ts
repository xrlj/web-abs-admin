import { Component, OnInit } from '@angular/core';
import {VUserReq} from '../../../helpers/vo/req/v-user-req';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Observer, Observable } from '_rxjs@6.4.0@rxjs';

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
  sexRadioValue = '1'; // 性别选择。1-男；2-女；0-保密
  status = '-1'; // 用户状态。-1=停用；1-正常

  constructor(private fb: FormBuilder) {
    // 新增编辑对话框
    this.addOrEditForm = this.fb.group({
      username: [null, [Validators.required], [this.userNameAsyncValidator]],
      dept: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirm: [null, [this.confirmValidator]],
      sex: [null, null],
      email: [null, [Validators.email]],
      mobile: [null, [Validators.maxLength(11)]],
      role: [null, null],
      status: [null, null]
    });
  }

  ngOnInit() {
  }

  search(): void {}

  addModalShow(): void {
    this.modalType = 1;
    this.isShowAddOrEditModal = true;
  }

  handleCancel(modalType: number): void {
    this.addOrEditForm.reset();
    this.isShowAddOrEditModal = false;
    this.isModalOkLoading = false;
    this.sexRadioValue = '1';
    this.status = '-1';
  }

  handleOk(modalType: number, value: any): void {
    for (const key in this.addOrEditForm.controls) {
      this.addOrEditForm.controls[key].markAsDirty();
      this.addOrEditForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
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

}
