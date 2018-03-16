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

  constructor(
    private router: Router,
    private hostService: HostService
  ){}

  ngOnInit(): void {}

  ping(): Host {
    this.hostService.ping(this.host.id).subscribe(host => { this.host = host;
    this.pingStatus = true;}, error => {
      if ( error.status === 401 ) {
        this.router.navigate(['/login']);
      }
    });
    return null;
  }
}
