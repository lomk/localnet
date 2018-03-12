import { Component, OnInit } from '@angular/core';

import { RemoteIp } from './remote-ip';
import { RemoteIpService } from './remote-ip.service';
import {Router} from '@angular/router';
import {User} from "../user/user";

@Component({
    selector: 'app-remote-ips',
    templateUrl: './remote-ip.component.html' ,
    // styleUrls: [`./remote-ip.component.css`],
    providers: [RemoteIpService]
})
export class RemoteIpComponent implements OnInit {
    currentUser: User;
    remoteIps: RemoteIp[];
    selectedRemoteIp: RemoteIp;

    constructor(
        private router: Router,
        private remoteIpService: RemoteIpService) { this.currentUser = JSON.parse(localStorage.getItem('currentUser'));}

    getRemoteIps(): void {
        this.remoteIpService.getRemoteIps().subscribe(remoteIps => this.remoteIps = remoteIps,
          error => {
            if ( error === 401 ) {
              this.router.navigate(['/login']);
            }
          });
    }

    delete(remoteIp: RemoteIp): void {
        this.remoteIpService
            .delete(remoteIp.id)
            .subscribe(() => {
                this.remoteIps = this.remoteIps.filter(h => h !== remoteIp);
                if (this.selectedRemoteIp === remoteIp) { this.selectedRemoteIp = null; }
            });
    }

    ngOnInit(): void {
        this.getRemoteIps();
    }

    onSelect(remoteIp: RemoteIp): void {
        this.selectedRemoteIp = remoteIp;
    }

    goToDetail(): void {
        this.router.navigate(['/remote-ip-details', this.selectedRemoteIp.id]);
    }
}
