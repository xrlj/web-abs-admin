import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Api} from '../../helpers/http/api';
import {VLoginResp, VLoginRespData} from '../../helpers/vo/resp/v-login-resp';
import {VLoginReq} from '../../helpers/vo/req/v-login-req';
import {ApiPath} from '../../api-path';
import {environment} from '../../../environments/environment';
import {Constants} from '../../helpers/constants';
import {Utils} from '../../helpers/utils';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private fb: FormBuilder, private api: Api, private utils: Utils, private notification: NzNotificationService) {}

  validateForm: FormGroup;

  data: VLoginRespData;

  isLoadingOne = false;

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });

    this.verifyLogin();
  }

  private verifyLogin(): void {
    const authToken = localStorage.getItem(Constants.localStorageKey.token);
    if (authToken && !this.utils.jwtTokenIsExpired(authToken)) { // 已登录且未失效
      this.router.navigateByUrl('/pages');
    } else {
      localStorage.clear();
    }
  }

  submitForm(): void {
    this.router.navigateByUrl('/init');
    /*this.isLoadingOne = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    const body: VLoginReq = {
      username: this.validateForm.value.username,
      password: this.validateForm.value.password,
      clientid: environment.clientId,
      clientDeviceType: Constants.appInfo.clientDeviceType
    };
    this.api.post(ApiPath.login, body).ok(data => {
      this.isLoadingOne = false;
      localStorage.setItem(Constants.localStorageKey.token, data.access_token);
      this.utils.jwtTokenDecode(data.access_token);
      this.router.navigateByUrl('/pages');
    }).fail(error => {
      this.isLoadingOne = false;
      this.notification.create('error', '登录失败', error.msg);
    });*/
  }
}
