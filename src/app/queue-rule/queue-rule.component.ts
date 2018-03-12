import {Component, OnInit} from '@angular/core';
import {QueueRuleService} from './queue-rule.service';
import {QueueRule} from './queue-rule';
import {Router} from '@angular/router';
import {User} from '../user/user';

@Component({
    selector: 'app-queue-rules',
    templateUrl: './queue-rule.component.html' ,
    // styleUrls: [`./queue-rule.component.css`],
    providers: [QueueRuleService]
})
export class QueueRuleComponent implements OnInit {
    currentUser: User;
    queueRules: QueueRule[];
    selectedQueueRule: QueueRule;


    constructor(
        private router: Router,
        private queueRuleService: QueueRuleService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    getQueueRules(): void {
        // this.queueRuleService.getQueueRules().then(queueRules => this.queueRules = queueRules);
        this.queueRuleService.getQueueRules().subscribe(queueRules => this.queueRules = queueRules,
          error => {
            if ( error === 401 ) {
              this.router.navigate(['/login']);
            }
          });
    }

    addQueueRule(address: string): void{
        address = address.trim();
        if (!address) { return; }
        this.queueRuleService.create(new QueueRule()).subscribe(queueRule => {
            this.queueRules.push(queueRule);
            this.selectedQueueRule = null;
        });
    }

    deleteQueueRule(queueRule: QueueRule): void {
        this.queueRuleService
            .delete(queueRule.id)
            .subscribe(() => {
                this.queueRules = this.queueRules.filter(h => h !== queueRule);
                if (this.selectedQueueRule === queueRule) { this.selectedQueueRule = null; }
            });
    }

    ngOnInit(): void {
        this.getQueueRules();
    }

    onSelect(queueRule: QueueRule): void {
        this.selectedQueueRule = queueRule;
    }

    goToDetail(): void {
        this.router.navigate(['/queue-rule-details', this.selectedQueueRule.id]);
    }
}
