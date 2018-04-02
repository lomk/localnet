import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {HostService} from './host.service';
import {Host} from './host';
import {Router} from '@angular/router';
import {NgProgress} from 'ngx-progressbar';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-host-details',
  templateUrl: './host-details.component.html'
})
export class HostDetailsComponent implements OnInit, OnDestroy {
  pingStatus: Boolean = false;
  wakeStatus: Boolean = false;
  isActive: Boolean = false;
  isSelected: Boolean = false;
  private subscription: Subscription;
  private timer: Observable<any>;

  @Input() host: Host;
  @Input() hosts: Host[];
  @Output() deleteEvent = new EventEmitter<Host>();
  @Output() updateEvent = new EventEmitter<Host>();

  constructor(
    private router: Router,
    private hostService: HostService,
    private ngProgress: NgProgress
  ){}

  ngOnInit(): void {
    this.refreshHost();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  delete(){
    this.deleteEvent.emit(this.host);
  }

  update(){
    this.updateEvent.emit(this.host);
  }

  edit(){
    this.router.navigate(['/admin/hosts/edit/' + this.host.id ]);
  }

  select(){
    if (this.isSelected === false) {
      this.isSelected = true;
    } else {
      this.isSelected = false;
      this.pingStatus = false;
      this.wakeStatus = false;
    }
  }

  setActive(){
    this.isActive = true;
  }

  unSetActive(){
    this.isActive = false;
  }

  ping(): void {
    this.ngProgress.start();
    this.pingStatus = false;
    this.hostService.ping(this.host.id).subscribe(host => { this.host = host;
    this.pingStatus = true;
    this.update();
      this.ngProgress.done();
      }, error => {this.ngProgress.done();
      if ( error.status === 401 ) {
        this.router.navigate(['/login']);
      }
    });
    this.timer = Observable.timer(10000);
    this.subscription = this.timer.subscribe(() => {
      this.pingStatus = false;
    });
  }

  wake(): void {
    this.ngProgress.start();
    this.wakeStatus = false;
    this.hostService.wake(this.host.id).subscribe(status => { if (status === 'sent') {
      this.wakeStatus = true;
      this.ngProgress.done();
    }}, error => {
      if ( error.status === 401 ) {
        this.router.navigate(['/login']);
      }
      if ( error.status === 404 ) {
        this.ngProgress.done();
      }
    });
    this.timer = Observable.timer(10000);
    this.subscription = this.timer.subscribe(() => {
      this.wakeStatus = false;
    });
  }

  getHost(id: number): void {
    this.ngProgress.start();
    this.hostService.getHost(id).subscribe(host => {this.host = host;
        this.ngProgress.done();
        this.update();
      },
      error => {this.ngProgress.done();
        if ( error.status === 401 ) {
          this.router.navigate(['/login']);
        }
      });
  }

  refreshHost(): void {
    // this.ngProgress.start();
    this.subscription = this.hostService.subscribeHost(this.host.id).subscribe(host => {this.host = host;
        this.ngProgress.done();
        this.update();
      },
      error => {
        if ( error.status === 401 ) {
          console.log(error.toString());
        }
      });
  }
}
