///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit }    from '@angular/core';
import { Host }                 from './host';
import { HostService }          from './host.service';
import {Router}                 from '@angular/router';
import {User}                   from '../user/user';
import { DatePipe } from '@angular/common';
import {NgProgress} from 'ngx-progressbar';



@Component({
  selector: 'app-hosts',
  templateUrl: './host.component.html',
  providers: [HostService]
})
export class HostComponent implements OnInit {
    currentUser: User;
    hosts: Host[];
    selectedHost: Host;
    activeHost: Host;
    showDetails = false;
    // sortname: String = 'hostname';
    // interval: any;

  isDesc: Boolean = false;
  column: String = 'hostname';
  direction: number;

    constructor(
        private router: Router,
        private hostService: HostService,
        private ngProgress: NgProgress) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    getHosts(): void {
        this.ngProgress.start();
        this.hostService.getHosts().subscribe(hosts => {this.hosts = hosts;
            this.ngProgress.done();
            },
            error => {this.ngProgress.done();
          if ( error.status === 401 ) {
            this.router.navigate(['/login']);
          }
        });
    }

    // refreshHosts(): void {
    //   this.hostService.getHosts().subscribe(hosts => {
    //     for (const host of hosts) {
    //     const hostid: number = hosts.indexOf(host);
    //         if (!this.hosts[hosts.indexOf(host)].isUp === host.isUp){
    //           this.hosts[hosts.indexOf(host)].isUp = host.isUp;
    //           console.log(host.ipAddress);
    //           console.log(host.isUp);
    //
    //         }
    //       }
    //     },
    //     error => {
    //       if ( error.status === 401 ) {}
    //     });
    // }

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
        // this.interval = setInterval(() => {this.refreshHosts();}, 5000);
    }

    onSelect(host: Host): void {
        this.activeHost = host;
    }

    loadDetails(host: Host): void {
        this.showDetails = true;
        this.selectedHost = host;
        // this.activeHost = host;
    }
}
