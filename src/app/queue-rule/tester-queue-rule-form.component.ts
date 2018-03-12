import {Component, OnInit}      from '@angular/core';
import {Router}                 from '@angular/router';
import {QueueRuleService}       from './queue-rule.service';
import {QueueTypeService}       from '../queue-type/queue-type.service';
import {LocalIpService}         from '../local-ip/local-ip.service';
import {LocalIp}                from '../local-ip/local-ip';
import {QueueType}              from '../queue-type/queue-type';
import {TrafficQueue}           from '../traffic-queue/traffic-queue';
import {RemoteIp}               from '../remote-ip/remote-ip';
import {RemoteIpService}        from '../remote-ip/remote-ip.service';
import {TrafficQueueService}    from '../traffic-queue/traffic-queue.service';
import {QueueRule}              from './queue-rule';
import {NgForm}                 from '@angular/forms';
import {User} from "../user/user";

@Component({
  selector: 'app-tester-queue-rule-form',
  templateUrl: './tester-queue-rule-form.component.html',
  providers: [
    QueueRuleService,
    QueueTypeService,
    TrafficQueueService,
    TrafficQueueService,
    LocalIpService,
    RemoteIpService
  ]
})
export class TesterQueueRuleFormComponent implements OnInit {
  localIps: LocalIp[];
  remoteIps: RemoteIp[];
  queueTypes: QueueType[];
  trafficQueues: TrafficQueue[];
  localIp: LocalIp;
  remoteIp: RemoteIp;
  queueType: QueueType;
  trafficQueue: TrafficQueue;
  queueRule: QueueRule;
  currentUser: User;

  constructor(
    private router: Router,
    private queueRuleService: QueueRuleService,
    private queueTypeService: QueueTypeService,
    private trafficQueueService: TrafficQueueService,
    private localIpService: LocalIpService,
    private remoteIpService: RemoteIpService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  getData(): void {
    this.queueTypeService.getTesterQueueTypes().subscribe(queueTypes => this.queueTypes = queueTypes);
    // this.localIpService.getLocalIps().subscribe(localIps => this.localIps = localIps);
    this.remoteIpService.getTesterRemoteIps().subscribe(remoteIps => this.remoteIps = remoteIps);
    this.trafficQueueService.getTesterTrafficQueues().subscribe(trafficQueues => this.trafficQueues = trafficQueues);
  }

  onFormSubmit(form: NgForm) {
    const formLocalIp = null;
    const formRemoteIp = form.controls['remoteIp'].value;
    const formQueueType = form.controls['queueType'].value;
    const formTrafficQueue = form.controls['trafficQueue'].value;

    const newQueueRule = new QueueRule();
    newQueueRule.localIp = formLocalIp;
    newQueueRule.remoteIp = formRemoteIp;
    newQueueRule.queueType = formQueueType;
    newQueueRule.trafficQueue = formTrafficQueue;
    this.queueRuleService.testerCreateRule(newQueueRule).subscribe(queueRule => {
      this.queueRule = queueRule;
      this.router.navigate([this.currentUser.role.name.toLowerCase() + '/queue-rules']);
    });
  }

  ngOnInit(): void {
    this.getData();
  }

}


