import {RouterModule, Routes}         from '@angular/router';
import {NgModule}                     from '@angular/core';

import {AdminComponent}               from './admin.component';

import {RoleFormComponent}            from '../role/role-form.component';
import {RoleComponent}                from '../role/role.component';
import {UserComponent}                from '../user/user.component';
import {UserFormComponent}            from '../user/user-form.component';
import {AdminGuard}                   from './admin-guard.service';
import {HostComponent} from '../host/host.component';



const adminRoutes: Routes = [
  {
    path: 'admin', component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'hosts',                    component: HostComponent},
      { path: 'roles',                    component: RoleComponent},
      { path: 'roles/new',                component: RoleFormComponent},
      { path: 'users',                    component: UserComponent},
      { path: 'users/new',                component: UserFormComponent}
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
