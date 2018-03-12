import {Component, OnInit} from '@angular/core';
import {ProviderService} from './provider.service';
import {Provider} from './provider';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {User} from "../user/user";

@Component({
    selector: 'provider-form',
    templateUrl: './provider-form.component.html',
    providers: [ ProviderService]
})
export class ProviderFormComponent implements OnInit {
    provider = new Provider();
    error: String;
  currentUser: User;

    constructor(private router: Router,
                private providerService: ProviderService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit(): void {
    }

    goToDetail(): void {
        this.router.navigate(['/provider-details']);
    }

    onFormSubmit(form: NgForm) {
        const newProvider = new Provider();
        newProvider.name = form.controls['name'].value;
        newProvider.pktMark = form.controls['pktMark'].value;
        this.providerService.create(newProvider)
            .subscribe(provider => {
              this.provider = provider;
              this.router.navigate([this.currentUser.role.name.toLowerCase() + '/providers'])
                .catch(error =>  console.error('asdasdasdasdasd'));
            });
    }
}
