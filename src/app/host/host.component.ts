
import {Component, OnDestroy, OnInit}   from '@angular/core';
import { Host }                         from './host';
import { HostService }                  from './host.service';
import {Router}                         from '@angular/router';
import {User}                           from '../user/user';
import {NgProgress}                     from 'ngx-progressbar';
import {SimpleTimer}                    from 'ng2-simple-timer';
import {Subscription}                   from 'rxjs/Subscription';





@Component({
  selector: 'app-hosts',
  templateUrl: './host.component.html',
  providers: [HostService, SimpleTimer]
})
export class HostComponent implements OnInit, OnDestroy {
    currentUser: User;
    hosts: Host[];
    selectedHost: Host;
    isDesc: Boolean = false;
    column: String = 'hostname';
    direction: number;
    private subscription: Subscription;


    constructor(
        private router: Router,
        private hostService: HostService,
        private ngProgress: NgProgress) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    getHosts(): void {
        this.ngProgress.start();
        this.subscription = this.hostService.getHosts().subscribe(hosts => {
              this.hosts = hosts;
              this.ngProgress.done();
            },
            error => {this.ngProgress.done();
          if ( error.status === 401 ) {
            this.router.navigate(['/login']);
          }
        });
    }

    updateHosts(newHost: Host): void {
      this.hosts.find(host => host.id === newHost.id).isUp = newHost.isUp;
      this.hosts.find(host => host.id === newHost.id).customName = newHost.customName;
      this.hosts.find(host => host.id === newHost.id).place = newHost.place;
    }

    delete(host: Host): void {
        this.hostService
            .delete(host.id)
            .subscribe(() => {
                this.hosts = this.hosts.filter(h => h !== host);
                if (this.selectedHost === host) { this.selectedHost = null; }
            });
    }

  sort(property){
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

    ngOnInit(): void {
        this.getHosts();
    }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.ngProgress.done();
  }

}
