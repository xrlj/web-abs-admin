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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private fb: FormBuilder, private api: Api, private utils: Utils) {}

  validateForm: FormGroup;

  data: VLoginRespData;

  isLoadingOne = false;

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(status: number, msg: string): void {
    this.isLoadingOne = true;
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
      alert(error.code);
      alert(error.msg);
      this.isLoadingOne = false;
    });
  }
}
