import { Component, OnInit } from '@angular/core';
import {UIHelper} from '../../helpers/ui-helper';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.less']
})
export class NotFoundComponent implements OnInit {

  constructor(private uiHelper: UIHelper) { }

  ngOnInit() {
  }

  goBack() {
    this.uiHelper.goBack();
  }

}
