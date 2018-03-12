import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { QueueRule }         from './queue-rule';
import { QueueRuleService }  from './queue-rule.service';
@Component({
    selector: 'queue-rule-details',
    templateUrl: './queue-rule-details.component.html'
})
export class QueueRuleDetailsComponent implements OnInit {
    queueRule: QueueRule;

    constructor(
        private queueRuleService: QueueRuleService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.queueRuleService.getQueueRule(+params.get('id')))
            .subscribe(queueRule => this.queueRule = queueRule);
    }

    goBack(): void {
        this.location.back();
    }
}
