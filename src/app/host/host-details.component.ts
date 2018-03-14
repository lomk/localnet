import {Component, Input, OnInit} from '@angular/core';
import {HostService} from './host.service';
import {Host} from './host';
import {Router} from '@angular/router';

@Component({
  selector: 'app-host-details',
  templateUrl: './host-details.component.html',
  providers: [HostService]
})
export class HostDetailsComponent implements OnInit {
  @Input() currentHost: Host;
  ngOnInit(): void {}
}
