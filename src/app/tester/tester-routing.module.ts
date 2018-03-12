import {RouterModule, Routes}         from '@angular/router';
import {NgModule}                     from '@angular/core';

import {TesterComponent}              from './tester.component';
import {RemoteIpComponent}            from '../remote-ip/remote-ip.component';
import {RemoteIpFormComponent}        from '../remote-ip/remote-ip-form.component';
import {TesterGuard}                  from './tester-guard.service';
import {TesterQueueRuleFormComponent} from '../queue-rule/tester-queue-rule-form.component';
import {TesterQueueRuleComponent}     from '../queue-rule/tester-queue-rule.component';
import {TesterRemoteIpFormComponent} from "../remote-ip/tester-remote-ip-form.component";
import {TesterRemoteIpComponent} from "../remote-ip/tester-remote-ip.component";


const testerRoutes: Routes = [
  {
    path: 'tester', component: TesterComponent,
    canActivate: [TesterGuard],
    children: [
      { path: 'remote-ips',               component: TesterRemoteIpComponent },
      { path: 'remote-ips/new',           component: TesterRemoteIpFormComponent },
      { path: 'queue-rules',              component: TesterQueueRuleComponent },
      { path: 'queue-rules/new',          component: TesterQueueRuleFormComponent }
    ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(testerRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TesterRoutingModule { }
