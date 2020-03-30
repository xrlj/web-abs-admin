import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZhAreaManageComponent } from './zh-area-manage.component';

describe('ZhAreaManageComponent', () => {
  let component: ZhAreaManageComponent;
  let fixture: ComponentFixture<ZhAreaManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZhAreaManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZhAreaManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
