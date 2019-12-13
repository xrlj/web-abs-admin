import {Component} from '@angular/core';
import {EventBusService} from './helpers/event-bus/event-bus.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.less'],
  providers: [EventBusService]
})
export class AppComponent {
  title = '总后台';

  constructor(private eventBusService: EventBusService) {
  }
}
