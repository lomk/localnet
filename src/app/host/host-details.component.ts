import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {HostService} from './host.service';
import {Host} from './host';
import {Router} from '@angular/router';

@Component({
  selector: 'app-host-details',
  templateUrl: './host-details.component.html',
  // providers: [HostService]
})
export class HostDetailsComponent implements OnInit {
  pingStatus: Boolean = false;
  wakeStatus: Boolean = false;

  @Input() host: Host;
  @Input() hosts: Host[];

  constructor(
    private router: Router,
    private hostService: HostService
  ){}

  ngOnInit(): void {}

  ping(): Host {
    this.pingStatus = false;
    this.hostService.ping(this.host.id).subscribe(host => { this.host = host;
    this.pingStatus = true;
    const hostid: number = this.hosts.indexOf(this.host);
    this.hosts[hostid].isUp = host.isUp;}, error => {
      if ( error.status === 401 ) {
        this.router.navigate(['/login']);
      }
    });
    return null;
  }

  wake(): String {
    this.wakeStatus = false;
    this.hostService.wake(this.host.id).subscribe(status => { if (status === 'sent') {
      this.wakeStatus = true;}}, error => {
      if ( error.status === 401 ) {
        this.router.navigate(['/login']);
      }
    });
    return null;
  }
}
