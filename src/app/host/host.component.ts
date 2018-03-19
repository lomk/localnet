///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit }    from '@angular/core';
import { Host }                 from './host';
import { HostService }          from './host.service';
import {Router}                 from '@angular/router';
import {User}                   from '../user/user';



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
    sortname: String = 'hostname';

  isDesc: Boolean = false;
  column: String = 'hostname';
  direction: number;

    constructor(
        private router: Router,
        private hostService: HostService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    getHosts(): void {
        this.hostService.getHosts().subscribe(hosts => this.hosts = hosts,
            error => {
          if ( error.status === 401 ) {
            this.router.navigate(['/login']);
          }
        });
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
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  };

    ngOnInit(): void {
        this.getHosts();
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
