import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryManageComponent } from './dictionary-manage.component';

describe('DictionaryManageComponent', () => {
  let component: DictionaryManageComponent;
  let fixture: ComponentFixture<DictionaryManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictionaryManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
