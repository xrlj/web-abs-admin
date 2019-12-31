import { Injectable } from '@angular/core';
import {Api} from '../../../helpers/http/api';

@Injectable({
  providedIn: 'root'
})
export class UserManageService {

  constructor(private api: Api) { }
}
