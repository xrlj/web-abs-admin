import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Api} from '../../helpers/http/api';
import {VLoginRespData} from '../../helpers/vo/resp/v-login-resp';
import {ApiPath} from '../../api-path';
import {Constants} from '../../helpers/constants';
import {Utils} from '../../helpers/utils';
import {UIHelper} from '../../helpers/ui-helper';
import {AppPath} from '../../app-path';
import {HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private fb: FormBuilder, private api: Api, private utils: Utils, private uiHelper: UIHelper) {}

  validateForm: FormGroup;

  data: VLoginRespData;

  isLoadingOne = false;

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

    this.uiHelper.verifyLoginAndJumpToHome();
  }

  submitForm(): void {
    this.isLoadingOne = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const headers = new HttpHeaders({
      Authorization: 'Basic '.concat(this.utils.base64encoder(this.validateForm.value.username + ':' + this.validateForm.value.password))
    });
    this.api.post(ApiPath.login, null, null, null, null, headers).ok(data => {
      localStorage.setItem(Constants.localStorageKey.token, data.access_token);
      this.router.navigateByUrl(AppPath.init);
    }).fail(error => {
      this.uiHelper.msgTipError(error.msg);
    }).final(() => {
      this.isLoadingOne = false;
    });
  }

  clearUsername() {
    this.validateForm.controls.username.setValue(null);
  }

  clearPassword() {
    this.validateForm.controls.password.setValue(null);
  }
}
