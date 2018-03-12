import {UserIpService}          from './user-ip.service';
import {UserIp}                 from './user-ip';
import {Component, OnInit}      from '@angular/core';
import {Router}                 from '@angular/router';
import {NgForm}                 from '@angular/forms';
import {LocalIp}                from '../local-ip/local-ip';
import {User}                   from '../user/user';
import {UserService}            from '../user/user.service';
import {LocalIpService}         from '../local-ip/local-ip.service';

@Component({
    selector: 'local-ip-form',
    templateUrl: './user-ip-form.component.html',
    providers: [ UserIpService, UserService, LocalIpService]
})
export class UserIpFormComponent implements OnInit {
    userIp = new UserIp();
    users: User[];
    localIps: LocalIp[];
    error: String;
    currentUser: User;

    constructor(private router: Router,
                private userIpService: UserIpService,
                private localIpService: LocalIpService,
                private userService: UserService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    getData(): void {
        this.userService.getUsers().subscribe(users => this.users = users);
        this.localIpService.getLocalIps().subscribe(localIps => this.localIps = localIps);
    }
    ngOnInit(): void {
        this.getData();
    }

    onFormSubmit(form: NgForm) {
        let newUserIp = new UserIp();
        newUserIp.user = form.controls['user'].value;
        newUserIp.localIp = form.controls['localIp'].value;
        this.userIpService.create(newUserIp)
            .subscribe(userIp => {
              this.userIp = userIp;
              this.router.navigate([this.currentUser.role.name.toLowerCase() + '/user-ips'])
                .catch(error =>  console.error('asdasdasdasdasd'));
            });
    }
}
