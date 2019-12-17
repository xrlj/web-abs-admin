import { Injectable } from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {ApiPath} from '../../../api-path';

@Injectable({
  providedIn: 'root'
})
export class RoleManageService {

  constructor(private api: Api) { }

  /*getRolePage(): any {
    this.api.post(ApiPath)
    return null;
  }*/
}
