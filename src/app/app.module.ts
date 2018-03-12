import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import {HttpModule}                 from '@angular/http';

import { AppComponent }             from './app.component';
import {AppRoutingModule}           from './app-routing.module';
import {Globals }                   from './globals';
import {LoginComponent}             from './auth/login.component';
import {LogoutComponent}            from './auth/logout.component';
import {AdminModule}                from './admin/admin.module';
import {TesterModule}               from './tester/tester.module';
import {AuthService}                from './auth/auth.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AdminModule,
        TesterModule,
        AppRoutingModule
  ],
    declarations: [
        AppComponent,
        // RemoteIpDetailComponent,
        // RemoteIpComponent,
        // RemoteIpFormComponent,
        // QueueRuleComponent,
        // TesterQueueRuleComponent,
        // QueueRuleDetailsComponent,
        // QueueRuleFormComponent,
        // TesterQueueRuleFormComponent,
        LoginComponent,
        LogoutComponent
  ],
    providers: [
        Globals,
        AuthService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
