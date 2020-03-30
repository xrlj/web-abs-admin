import {Injectable} from '@angular/core';
import {UIHelper} from '../ui-helper';
import {Router} from '@angular/router';
import {AppPath} from '../../app-path';

@Injectable({
  providedIn: 'root'
})
export class HttpUtils {

  constructor(private uiHelper: UIHelper, private router: Router) {
  }

  /**
   * 系统错误码统一处理。业务错误码在回调函数中处理。
   * @param errorCode 错误码
   * @param msg 错误信息。
   */
  public dealError(errorCode: number, msg: string): boolean {
    let isUnifiedError = false;
    if (errorCode === 401) { // 缺少api验证参数token
      isUnifiedError = true;
      this.uiHelper.msgTipWarning(msg);
    } else if (errorCode === 404) {
      isUnifiedError = true;
      this.uiHelper.msgTipError('请求不存在');
    } else if (errorCode === 410 || errorCode === 411 || errorCode === 412) { // 无效token或者已退出登录
      isUnifiedError = true;
      this.uiHelper.msgTipWarning(msg);
      localStorage.clear();
      this.router.navigateByUrl(AppPath.login);
    } else if (errorCode === 405) { // 对接口无访问权限
      isUnifiedError = true;
      this.uiHelper.msgTipWarning(msg);
    } else if (errorCode === 500) { // 系统内部未知异常
      isUnifiedError = true;
      this.uiHelper.msgTipError(msg);
    }
    return isUnifiedError;
  }
}
