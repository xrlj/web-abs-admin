import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UIHelper} from '../../../helpers/ui-helper';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less'],
  providers: [DefaultBusService]
})
export class DefaultComponent implements OnInit {
  // 控制目录的展开/折叠
  collapsed = false;

  isSpinning = false;

  constructor(private router: Router, private uiHelper: UIHelper, private defaultBusService: DefaultBusService) {
    // 订阅是否显示加载对话框事件
    this.defaultBusService.loadingSpin$.subscribe(isLoadingSpin => {
      this.isSpinning = isLoadingSpin;
    });
  }

  ngOnInit() {
    this.uiHelper.verifyLoginAndJumpToLogin();
  }

  onToggleCollapsed(evt) {
    console.log('执行了 onToggleCollapsed');
    this.collapsed = !this.collapsed;
  }

  /*showSpinning(isSpinning: boolean) {
    this.isSpinning = isSpinning;
  }*/
}
