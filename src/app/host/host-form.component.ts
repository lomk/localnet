import {NetService}         from '../net/net.service';
import {Net}                from '../net/net';
import {LocalIpService}     from './host.service';
import {LocalIp}            from './host';
import {Component, OnInit}  from '@angular/core';
import {Router}             from '@angular/router';
import {NgForm}             from '@angular/forms';
import {User}               from '../user/user';

@Component({
    selector: 'local-ip-form',
    templateUrl: './host-form.component.html',
    providers: [ LocalIpService]
})
export class LocalIpFormComponent implements OnInit {
    localIp = new LocalIp();
    nets: Net[];
    error: String;
  currentUser: User;

    constructor(private router: Router,
                private localIpService: LocalIpService,
                private netService: NetService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    getData(): void {
        this.netService.getNets().subscribe(nets => this.nets = nets);
    }
    ngOnInit(): void {
        this.getData();
    }

    onFormSubmit(form: NgForm) {
        const newLocalIp = new LocalIp();
        newLocalIp.address = form.controls['address'].value;
        newLocalIp.net = form.controls['net'].value;
        this.localIpService.create(newLocalIp)
            .subscribe(localIp => {
              this.localIp = localIp;
              this.router.navigate([this.currentUser.role.name.toLowerCase() + '/local-ips']);
            },
              error => {if (error.json().errorMessage) {this.error = error.json().errorMessage; }}
            );
    }
}
