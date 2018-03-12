import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import {HttpModule}                 from '@angular/http';

import {AppRoutingModule}           from '../app-routing.module';
import {Globals }                   from '../globals';
import {RemoteIpService}            from '../remote-ip/remote-ip.service';
import {QueueRuleService}           from '../queue-rule/queue-rule.service';
import {TrafficQueueService}        from '../traffic-queue/traffic-queue.service';
import {TesterComponent}            from './tester.component';
import {AuthService}                from '../auth/auth.service';
import {TesterGuard}                from './tester-guard.service';
import {TesterQueueRuleComponent} from "../queue-rule/tester-queue-rule.component";
import {TesterQueueRuleFormComponent} from "../queue-rule/tester-queue-rule-form.component";
import {TesterRemoteIpComponent} from "../remote-ip/tester-remote-ip.component";
import {TesterRemoteIpFormComponent} from "../remote-ip/tester-remote-ip-form.component";



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    TesterComponent,
    TesterQueueRuleComponent,
    TesterQueueRuleFormComponent,
    TesterRemoteIpComponent,
    TesterRemoteIpFormComponent
 ],
  providers: [
    Globals,
    RemoteIpService,
    QueueRuleService,
    TrafficQueueService,
    AuthService,
    TesterGuard
  ],
  exports: [
    TesterComponent
    // TesterQueueRuleComponent,
    // TesterQueueRuleFormComponent,
    // TesterRemoteIpComponent,
    // TesterRemoteIpFormComponent
  ]
})
export class TesterModule { }
