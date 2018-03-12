import {Component, OnInit} from '@angular/core';
import {QueueTypeService} from './queue-type.service';
import {QueueType} from './queue-type';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {User} from "../user/user";

@Component({
    selector: 'queue-type-form',
    templateUrl: './queue-type-form.component.html',
    providers: [ QueueTypeService]
})
export class QueueTypeFormComponent implements OnInit {
    queueType = new QueueType();
    error: String;
  currentUser: User;

    constructor(private router: Router,
                private queueTypeService: QueueTypeService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit(): void {
    }

    goToDetail(): void {
        this.router.navigate(['/queue-type-details']);
    }

    onFormSubmit(form: NgForm) {
        let type = form.controls['type'].value;
        let newQueueType = new QueueType();
        newQueueType.type = type;
        this.queueTypeService.create(newQueueType)
            .subscribe(queueType => {this.queueType = queueType; this.router.navigate([this.currentUser.role.name.toLowerCase() + '/queue-types'])
                .catch(error =>  console.error('asdasdasdasdasd'));
            });
    }
}
