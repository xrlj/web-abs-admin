import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementMyComponent } from './announcement-my.component';

describe('AnnouncementMyComponent', () => {
  let component: AnnouncementMyComponent;
  let fixture: ComponentFixture<AnnouncementMyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementMyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
