import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import {LoginComponent}             from './auth/login.component';
import {LogoutComponent}            from './auth/logout.component';
import {AdminComponent}             from './admin/admin.component';
import {AdminRoutingModule}         from './admin/admin-routing.module';
// import {TesterComponent}            from './tester/tester.component';
// import {TesterRoutingModule}        from './tester/tester-routing.module';
import {AuthService}                from './auth/auth.service';

const routes: Routes = [
    { path: '',                         redirectTo: '/login', pathMatch: 'full' },
    { path: 'login',                    component: LoginComponent},
    { path: 'logout',                   component: LogoutComponent},
    { path: 'admin',                    component: AdminComponent}
    // { path: 'tester',                   component: TesterComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes), AdminRoutingModule ],
    exports: [ RouterModule ], providers : [
  AuthService
]
})
export class AppRoutingModule {}
