import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import {HttpModule}                 from '@angular/http';

import {AppRoutingModule}           from '../app-routing.module';
import {Globals }                   from '../globals';
import {RoleComponent}              from '../role/role.component';
import {RoleFormComponent}          from '../role/role-form.component';
import {RoleService}                from '../role/role.service';
import {UserService}                from '../user/user.service';
import {UserComponent}              from '../user/user.component';
import {UserFormComponent}          from '../user/user-form.component';
import {AuthService}                from '../auth/auth.service';
import {AdminComponent}             from './admin.component';
import {AdminGuard}                 from './admin-guard.service';
import {HostComponent}              from '../host/host.component';
import {HostService}                from '../host/host.service';
import {HostDetailsComponent} from '../host/host-details.component';
import { SortByPipe} from '../host/SortByPipe';
import {NgProgressModule} from 'ngx-progressbar';
import {PlaceComponent} from '../place/place.component';
import {PlaceFormComponent} from '../place/place-form.component';
import {HostFormComponent} from '../host/host-form.component';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgProgressModule
  ],
  declarations: [
    AdminComponent,
    HostComponent,
    HostDetailsComponent,
    HostFormComponent,
    PlaceComponent,
    PlaceFormComponent,
    RoleComponent,
    RoleFormComponent,
    UserComponent,
    UserFormComponent,
    SortByPipe
  ],
  providers: [
    Globals,
    HostService,
    RoleService,
    UserService,
    AuthService,
    AdminGuard
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule { }
