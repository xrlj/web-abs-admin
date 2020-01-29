import {Component, OnInit} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {Constants} from '../../../helpers/constants';
import {VMenuResp} from '../../../helpers/vo/resp/v-menu-resp';

const expandMenu = menus => {
  const result = [];
  menus.forEach(menu1 => {
    if (menu1.children && menu1.children.length > 0) {
      menu1.children.forEach(menu2 => {
        if (menu2.children && menu2.children.length > 0) {
          menu2.children.forEach(menu3 => {
            if (menu3.children && menu3.children.length > 0) {
              menu3.children.forEach(menu4 => {
                result.push([menu1, menu2, menu3, menu4]);
              });
            } else {
              result.push([menu1, menu2, menu3]);
            }
          });
        } else {
          result.push([menu1, menu2]);
        }
      });
    } else {
      result.push([menu1]);
    }
  });
  return result;
};

@Component({
  selector: 'app-body',
  templateUrl: './app-body.component.html',
  styleUrls: ['./app-body.component.less']
})
export class AppBodyComponent implements OnInit {
  currentBreads = [];

  private menus: VMenuResp[];

  constructor(private router: Router) {
    this.menus = JSON.parse(localStorage.getItem(Constants.localStorageKey.menus));
    console.log(this.menus);
    // detect router change
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.setCurrentBreads();
      }
    });
  }

  ngOnInit() {
  }

  setCurrentBreads() {
    const currentUrl = this.router.url;
    const expandedMenus = expandMenu(this.menus);

    let currentBreads = [];
    expandedMenus.forEach(menu => {
      if (menu.length) {
        const lastMenu = menu[menu.length - 1];
        if (lastMenu.link === currentUrl) {
          currentBreads = menu;
        }
      }
    });
    this.currentBreads = currentBreads;
  }
}
