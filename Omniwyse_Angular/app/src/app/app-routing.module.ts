import { NgModule } from '@angular/core';
import {AuthGuard} from './auth.guard';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ViewNotificationComponent } from './view-notification/view-notification.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'admin', component:AdminComponent, canActivate:[AuthGuard]},
  {path:'notification', component:NotificationsComponent, canActivate:[AuthGuard]},
  {path:'view-notification/:id', component:ViewNotificationComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
