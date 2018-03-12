import { Component, OnInit }    from '@angular/core';
import {Router}                 from '@angular/router';

import { Net }                  from './net';
import { NetService }           from './net.service';
import {User} from "../user/user";


@Component({
    selector: 'app-nets',
    templateUrl: './net.component.html',
    providers: [NetService]
})
export class NetComponent implements OnInit {
    currentUser: User;
    nets: Net[];
    selectedNet: Net;

    constructor(
        private router: Router,
        private netService: NetService) { this.currentUser = JSON.parse(localStorage.getItem('currentUser'));}

    getNets(): void {
        this.netService.getNets().subscribe(nets => this.nets = nets,
          error => {
            if ( error === 401 ) {
              this.router.navigate(['/login']);
            }
          });
    }

    delete(net: Net): void {
        this.netService
            .delete(net.id)
            .subscribe(() => {
                this.nets = this.nets.filter(h => h !== net);
                if (this.selectedNet === net) { this.selectedNet = null; }
            });
    }

    ngOnInit(): void {
        this.getNets();
    }

    onSelect(net: Net): void {
        this.selectedNet = net;
    }

    goToDetail(): void {
        this.router.navigate(['/net-details', this.selectedNet.id]);
    }
}
