import {Component, OnInit} from '@angular/core';
import {QueueRuleService} from './queue-rule.service';
import {QueueRule} from './queue-rule';
import {Router} from '@angular/router';
import {User} from "../user/user";

@Component({
  selector: 'app-tester-queue-rules',
  templateUrl: './tester-queue-rule.component.html' ,
  // styleUrls: [`./queue-rule.component.css`],
  providers: [QueueRuleService]
})
export class TesterQueueRuleComponent implements OnInit {
  currentUser: User;
  queueRules: QueueRule[];
  selectedQueueRule: QueueRule;


  constructor(
    private router: Router,
    private queueRuleService: QueueRuleService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  getTesterQueueRules(): void {
    // this.queueRuleService.getQueueRules().then(queueRules => this.queueRules = queueRules);
    this.queueRuleService.getTesterQueueRules().subscribe(queueRules => this.queueRules = queueRules,
      error => {
        if ( error === 401 ) {
          this.router.navigate(['/login']);
        }
      });
  }

  deleteTesterQueueRule(queueRule: QueueRule): void {
    this.queueRuleService
      .testerDeleteRule(queueRule.id)
      .subscribe(() => {
        this.queueRules = this.queueRules.filter(h => h !== queueRule);
        if (this.selectedQueueRule === queueRule) { this.selectedQueueRule = null; }
      });
  }

  ngOnInit(): void {
    this.getTesterQueueRules();
  }

  onSelect(queueRule: QueueRule): void {
    this.selectedQueueRule = queueRule;
  }
}
