import {Component, OnInit} from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {Router} from '@angular/router';
import {ApiPath} from '../../../api-path';
import {UIHelper} from '../../../helpers/ui-helper';
import {AppPath} from '../../../app-path';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import {Utils} from '../../../helpers/utils';
import {JwtKvEnum} from '../../../helpers/enum/jwt-kv-enum';
import {ThemeEnum} from '../../../helpers/enum/theme-enum';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.less']
})
export class AppHeaderComponent implements OnInit {
  constructor(private router: Router, private api: Api, public utils: Utils, private uiHelper: UIHelper, private defaultBusService: DefaultBusService) { }

  appName: string;

  jwtKvEnum: typeof  JwtKvEnum = JwtKvEnum;

  ngOnInit() {
    this.appName = '运营总后台';
    this.uiHelper.storageCurrentTheme('default');
  }

  /**
   * 退出登录。
   */
  logout(): void {
    this.uiHelper.modalConfirm('确定退出登录？')
      .ok(() => {
        this.defaultBusService.showLoading(true);
        this.api.get(ApiPath.logout).ok(data => {
          if (data) {
            localStorage.clear();
            this.router.navigateByUrl(AppPath.login); // 退出成功
          } else {
            this.uiHelper.msgTipError('退出失败');
          }
        }).fail(error => {
          this.uiHelper.msgTipError('退出失败');
        }).final(() => {
          this.defaultBusService.showLoading(false);
        });
      });
  }

  changeTheme(theme: ThemeEnum): void {
    const style = document.createElement('link');
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.id = `theme-${theme}-link`;
    switch (theme) {
      case ThemeEnum.Default:
        style.href = './assets/themes/style.default.css';
        break;
      case ThemeEnum.Orange:
        style.href = './assets/themes/style.orange.css';
        break;
      case ThemeEnum.Turquoise:
        style.href = './assets/themes/style.turquoise.css';
        break;
    }
    document.head.append(style);

    style.onload = () => {
      // 移除旧的
      for (const key in ThemeEnum) {
        const themeName = ThemeEnum[key];
        if (theme !== themeName) {
          const dom = document.getElementById(`theme-${themeName}-link`);
          if (dom) {
            dom.remove();
          }
        }
      }
    };
  }

  /**
   * 更改主题。
   * @param theme 主题。default 默认主题；orange 橙色主题；turquoise蓝绿色主题
   */
 /* changeTheme(theme: string) {
    let themeUrl = './assets/themes/style.default.css';
    switch (theme) {
      case 'orange':
        themeUrl = './assets/themes/style.orange.css';
        break;
      case 'turquoise':
        themeUrl = './assets/themes/style.turquoise.css';
        break;
    }

    // create new link element
    const newThemeElement = document.createElement('link') as HTMLLinkElement;
    // put the link into the document head
    document.head.appendChild(newThemeElement);

    // add the type to the link element
    newThemeElement.type = 'text/css';
    // add the rel to the link elmenent
    newThemeElement.rel = 'stylesheet';
    // listen the link load event
    newThemeElement.onload = () => {
      // get the theme link element
      const themeElements = document.querySelectorAll('link[theme-link]');
      // get all of the style elements and remove all of theme from the document
      themeElements.forEach(themeElement => {
        // remove the prevoius theme styles from the document when the new theme styles already downloaded
        document.head.removeChild(themeElement);
      });

      // add attribute to the theme link element
      newThemeElement.setAttribute('theme-link', '');
      // remove the listener
      newThemeElement.onload = null;

    };

    newThemeElement.href = themeUrl;

    this.uiHelper.storageCurrentTheme(theme); // 保存当前主题
  }*/
}
