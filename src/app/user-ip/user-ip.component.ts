import { Component, OnInit }    from '@angular/core';

import { UserIp }              from './user-ip';
import { UserIpService }       from './user-ip.service';
import {Router}                 from '@angular/router';
import {User} from "../user/user";

@Component({
    selector: 'app-user-ips',
    templateUrl: './user-ip.component.html' ,
    // styleUrls: [`./local-ip.component.css`],
    providers: [UserIpService]
})
export class UserIpComponent implements OnInit {
    currentUser: User;
    userIps: UserIp[];
    selectedUserIp: UserIp;

    constructor(
        private router: Router,
        private userIpService: UserIpService) { this.currentUser = JSON.parse(localStorage.getItem('currentUser'));}

    getUserIps(): void {
        this.userIpService.getUserIps().subscribe(userIps => this.userIps = userIps,
          error => {
            if ( error === 401 ) {
              this.router.navigate(['/login']);
            }
          });
    }

    delete(userIp: UserIp): void {
        this.userIpService
            .delete(userIp.id)
            .subscribe(() => {
                this.userIps = this.userIps.filter(h => h !== userIp);
                if (this.selectedUserIp === userIp) { this.selectedUserIp = null; }
            });
    }

    ngOnInit(): void {
        this.getUserIps();
    }

    onSelect(userIp: UserIp): void {
        this.selectedUserIp = userIp;
    }

    goToDetail(): void {
        this.router.navigate(['/local-ip-details', this.selectedUserIp.id]);
    }
}
