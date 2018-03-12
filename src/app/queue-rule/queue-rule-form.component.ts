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
    selector: 'queue-rule-form',
    templateUrl: './queue-rule-form.component.html',
    providers: [
        QueueRuleService,
        QueueTypeService,
        TrafficQueueService,
        TrafficQueueService,
        LocalIpService,
        RemoteIpService
    ]
})
export class QueueRuleFormComponent implements OnInit {
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
        this.queueTypeService.getQueueTypes().subscribe(queueTypes => this.queueTypes = queueTypes);
        this.localIpService.getLocalIps().subscribe(localIps => this.localIps = localIps);
        this.remoteIpService.getRemoteIps().subscribe(remoteIps => this.remoteIps = remoteIps);
        this.trafficQueueService.getTrafficQueues().subscribe(trafficQueues => this.trafficQueues = trafficQueues);
    }

    addRule(address: string): void{
        address = address.trim();
        if (!address) { return; }
        this.queueRuleService.create(new QueueRule()).subscribe(queueRule => {
            this.queueRule = queueRule;
            this.router.navigate(['/queue-rules']);
        });
    }

    onFormSubmit(form: NgForm) {
        const formLocalIp = form.controls['localIp'].value;
        const formRemoteIp = form.controls['remoteIp'].value;
        const formQueueType = form.controls['queueType'].value;
        const formTrafficQueue = form.controls['trafficQueue'].value;

        const newQueueRule = new QueueRule();
        newQueueRule.localIp = formLocalIp;
        newQueueRule.remoteIp = formRemoteIp;
        newQueueRule.queueType = formQueueType;
        newQueueRule.trafficQueue = formTrafficQueue;
        this.queueRuleService.create(newQueueRule).subscribe(queueRule => {
            this.queueRule = queueRule;
            this.router.navigate([this.currentUser.role.name.toLowerCase() + '/queue-rules']);
        });
    }

    ngOnInit(): void {
        this.getData();
    }
    // ngOnSubmit(): void {
    //     this.router.navigate(['/queue-rules']);
    // }
}


