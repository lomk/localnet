import {Component, OnInit}      from '@angular/core';
import {TrafficQueueService}    from './traffic-queue.service';
import {TrafficQueue}           from './traffic-queue';
import {Router}                 from '@angular/router';
import {NgForm}                 from '@angular/forms';
import {User} from "../user/user";

@Component({
    selector: 'trafficQueue-form',
    templateUrl: './traffic-queue-form.component.html',
    providers: [ TrafficQueueService]
})
export class TrafficQueueFormComponent implements OnInit {
    trafficQueue = new TrafficQueue();
    error: String;
  currentUser: User;

    constructor(private router: Router,
                private trafficQueueService: TrafficQueueService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit(): void {
    }

    goToDetail(): void {
        this.router.navigate(['/trafficQueue-details']);
    }

    onFormSubmit(form: NgForm) {
        const newTrafficQueue = new TrafficQueue();
        newTrafficQueue.name = form.controls['name'].value;
        newTrafficQueue.pktLoss = form.controls['pktLoss'].value;
        newTrafficQueue.pktLatency = form.controls['pktLatency'].value;
        this.trafficQueueService.create(newTrafficQueue)
            .subscribe(trafficQueue => {
              this.trafficQueue = trafficQueue;
              this.router.navigate([this.currentUser.role.name.toLowerCase() + '/traffic-queues']);
            });
    }
}
