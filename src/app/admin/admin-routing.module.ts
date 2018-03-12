import {RouterModule, Routes}         from '@angular/router';
import {NgModule}                     from '@angular/core';

import {AdminComponent}               from './admin.component';
import {RemoteIpComponent}            from '../remote-ip/remote-ip.component';
import {RemoteIpFormComponent}        from '../remote-ip/remote-ip-form.component';
import {QueueRuleComponent}           from '../queue-rule/queue-rule.component';
import {QueueRuleDetailsComponent}    from '../queue-rule/queue-rule-details.component';
import {QueueRuleFormComponent}       from '../queue-rule/queue-rule-form.component';
import {LocalIpComponent}             from '../local-ip/local-ip.component';
import {LocalIpFormComponent}         from '../local-ip/local-ip-form.component';
import {NetComponent}                 from '../net/net.component';
import {NetFormComponent}             from '../net/net-form.component';
import {ProviderComponent}            from '../provider/provider.component';
import {ProviderFormComponent}        from '../provider/provider-form.component';
import {QueueTypeComponent}           from '../queue-type/queue-type.component';
import {QueueTypeFormComponent}       from '../queue-type/queue-type-form.component';
import {TrafficQueueComponent}        from '../traffic-queue/traffic-queue.component';
import {TrafficQueueFormComponent}    from '../traffic-queue/traffic-queue-form.component';
import {RoleFormComponent}            from '../role/role-form.component';
import {RoleComponent}                from '../role/role.component';
import {UserComponent}                from '../user/user.component';
import {UserFormComponent}            from '../user/user-form.component';
import {UserIpComponent}              from '../user-ip/user-ip.component';
import {UserIpFormComponent}          from '../user-ip/user-ip-form.component';
import {AdminGuard}                   from './admin-guard.service';



const adminRoutes: Routes = [
  {
    path: 'admin', component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'remote-ips',               component: RemoteIpComponent },
      { path: 'remote-ips/new',           component: RemoteIpFormComponent },
      { path: 'queue-rules',              component: QueueRuleComponent },
      { path: 'queue-rules/new',          component: QueueRuleFormComponent },
      { path: 'local-ips',                component: LocalIpComponent },
      { path: 'local-ips/new',            component: LocalIpFormComponent },
      { path: 'nets',                     component: NetComponent },
      { path: 'nets/new',                 component: NetFormComponent},
      { path: 'providers',                component: ProviderComponent},
      { path: 'providers/new',            component: ProviderFormComponent},
      { path: 'queue-types',              component: QueueTypeComponent},
      { path: 'queue-types/new',          component: QueueTypeFormComponent},
      { path: 'traffic-queues',           component: TrafficQueueComponent},
      { path: 'traffic-queues/new',       component: TrafficQueueFormComponent},
      { path: 'roles',                    component: RoleComponent},
      { path: 'roles/new',                component: RoleFormComponent},
      { path: 'users',                    component: UserComponent},
      { path: 'users/new',                component: UserFormComponent},
      { path: 'user-ips',                 component: UserIpComponent},
      { path: 'user-ips/new',             component: UserIpFormComponent}
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
