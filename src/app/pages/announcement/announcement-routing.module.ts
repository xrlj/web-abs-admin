import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AnnouncementMyComponent} from './announcement-my/announcement-my.component';
import {AnnouncementManageComponent} from './announcement-manage/announcement-manage.component';

const routes: Routes = [
  { path: 'my', component: AnnouncementMyComponent },
  { path: 'manage', component: AnnouncementManageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementRoutingModule {}
