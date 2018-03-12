import { Component, OnInit }    from '@angular/core';

import { TrafficQueue }         from './traffic-queue';
import { TrafficQueueService }  from './traffic-queue.service';
import {Router}                 from '@angular/router';
import {User} from "../user/user";

@Component({
    selector: 'app-traffic-queues',
    templateUrl: './traffic-queue.component.html' ,
    // styleUrls: [`./traffic-queue.component.css`],
    providers: [TrafficQueueService]
})
export class TrafficQueueComponent implements OnInit {
    currentUser: User;
    trafficQueues: TrafficQueue[];
    selectedTrafficQueue: TrafficQueue;

    constructor(
        private router: Router,
        private trafficQueueService: TrafficQueueService) { this.currentUser = JSON.parse(localStorage.getItem('currentUser'));}

    getTrafficQueues(): void {
        this.trafficQueueService.getTrafficQueues().subscribe(trafficQueues => this.trafficQueues = trafficQueues,
          error => {
            if ( error === 401 ) {
              this.router.navigate(['/login']);
            }
          });
    }

    delete(trafficQueue: TrafficQueue): void {
        this.trafficQueueService
            .delete(trafficQueue.id)
            .subscribe(() => {
                this.trafficQueues = this.trafficQueues.filter(h => h !== trafficQueue);
                if (this.selectedTrafficQueue === trafficQueue) { this.selectedTrafficQueue = null; }
            });
    }

    ngOnInit(): void {
        this.getTrafficQueues();
    }

    onSelect(trafficQueue: TrafficQueue): void {
        this.selectedTrafficQueue = trafficQueue;
    }

    goToDetail(): void {
        this.router.navigate(['/traffic-queue-details', this.selectedTrafficQueue.id]);
    }
}
