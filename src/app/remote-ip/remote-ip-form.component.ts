import {Component, OnInit} from '@angular/core';
import {RemoteIpService} from './remote-ip.service';
import {RemoteIp} from './remote-ip';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {User} from "../user/user";

@Component({
    selector: 'app-remote-ip-form',
    templateUrl: './remote-ip-form.component.html',
    providers: [ RemoteIpService]
})
export class RemoteIpFormComponent implements OnInit {
    remoteIp = new RemoteIp();
    error: String;
  currentUser: User;

    constructor(private router: Router,
                private remoteIpService: RemoteIpService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit(): void {
    }


    goToDetail(): void {
        this.router.navigate(['remote-ip-details']);
    }

    onFormSubmit(form: NgForm) {
        const address = form.controls['address'].value;
        const newRemoteIp = new RemoteIp();
        newRemoteIp.address = address;
        newRemoteIp.mask = 32;
        this.remoteIpService.create(newRemoteIp)
          .subscribe(remoteIp => {
            this.remoteIp = remoteIp;
            this.router.navigate([this.currentUser.role.name.toLowerCase() + '/remote-ips']);
        });
    }
}
