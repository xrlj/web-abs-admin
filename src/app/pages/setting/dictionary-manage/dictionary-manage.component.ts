import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dictionary-manage',
  templateUrl: './dictionary-manage.component.html',
  styleUrls: ['./dictionary-manage.component.less']
})
export class DictionaryManageComponent implements OnInit {

  showType = 1;

  constructor() { }

  ngOnInit() {
  }

  changeShowType(showType: number) {
    this.showType = showType;
  }

}
