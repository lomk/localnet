import {RouterModule, Routes}         from '@angular/router';
import {NgModule}                     from '@angular/core';

import {AdminComponent}               from './admin.component';

import {RoleFormComponent}            from '../role/role-form.component';
import {RoleComponent}                from '../role/role.component';
import {UserComponent}                from '../user/user.component';
import {UserFormComponent}            from '../user/user-form.component';
import {AdminGuard}                   from './admin-guard.service';
import {HostComponent} from '../host/host.component';
import {PlaceComponent} from '../place/place.component';
import {PlaceFormComponent} from '../place/place-form.component';
import {HostFormComponent} from '../host/host-form.component';



const adminRoutes: Routes = [
  {
    path: 'admin', component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '',                         component: HostComponent},
      { path: 'hosts',                    component: HostComponent},
      { path: 'hosts/edit/:id',               component: HostFormComponent},
      { path: 'roles',                    component: RoleComponent},
      { path: 'roles/new',                component: RoleFormComponent},
      { path: 'users',                    component: UserComponent},
      { path: 'users/new',                component: UserFormComponent},
      { path: 'places',                   component: PlaceComponent},
      { path: 'places/new',               component: PlaceFormComponent}
      ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
