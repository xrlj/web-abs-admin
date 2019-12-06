import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {Api} from './helpers/http/api';

/**
 * 主配置类，所有的配置均在此。配置全局变量等。
 */
@Injectable({
  providedIn: 'root'
})
export class AppConfig {

    constructor(public apiRequest: Api) {
        if (environment.config_global) {
        }
    }
}
