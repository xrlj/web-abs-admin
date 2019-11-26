import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {ApiRequest} from './helpers/http/api-request';

/**
 * 主配置类，所有的配置均在此。配置全局变量等。
 */
@Injectable()
export class AppConfig {

    constructor(public apiRequest: ApiRequest) {
        if (environment.config_global) {
        }
    }
}
