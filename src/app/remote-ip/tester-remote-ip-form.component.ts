import {Component, OnInit} from '@angular/core';
import {RemoteIpService} from './remote-ip.service';
import {RemoteIp} from './remote-ip';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {User} from "../user/user";

@Component({
  selector: 'app-tester-remote-ip-form',
  templateUrl: './tester-remote-ip-form.component.html',
  providers: [ RemoteIpService]
})
export class TesterRemoteIpFormComponent implements OnInit {
  remoteIp = new RemoteIp();
  error: String;
  currentUser: User;

  constructor(private router: Router,
              private remoteIpService: RemoteIpService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {
    const address = form.controls['address'].value;
    const newRemoteIp = new RemoteIp();
    newRemoteIp.address = address;
    newRemoteIp.mask = 32;
    this.remoteIpService.createTesterRemoteIp(newRemoteIp)
      .subscribe(remoteIp => {
        this.remoteIp = remoteIp;
        this.router.navigate([this.currentUser.role.name.toLowerCase() + '/remote-ips']);
      });
  }
}
