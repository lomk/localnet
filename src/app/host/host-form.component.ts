import {PlaceService}        from '../place/place.service';
import {Place}               from '../place/place';
import {HostService}        from './host.service';
import {Host}               from './host';
import {Component, OnInit}  from '@angular/core';
import {Router}             from '@angular/router';
import {NgForm}             from '@angular/forms';

@Component({
    selector: 'app-host-form',
    templateUrl: './host-form.component.html',
    providers: [
        HostService,
        PlaceService]
})
export class HostFormComponent implements OnInit {
    host = new Host();
    places: Place[];
    error: String;
  currentHost: Host;

    constructor(private router: Router,
                private hostService: HostService,
                private placeService: PlaceService) {
      this.currentHost = JSON.parse(localStorage.getItem('currentHost'));
    }

    getData(): void {
        this.placeService.getPlaces().subscribe(places => this.places = places);
    }
    ngOnInit(): void {
        this.getData();
    }

    onFormSubmit(form: NgForm) {
        const newHost = new Host();
        newHost.hostname = form.controls['hostname'].value;
        newHost.place = form.controls['place'].value;
        this.hostService.create(newHost)
            .subscribe(host => {
              this.host = host;
              this.router.navigate([this.currentHost.place.name.toLowerCase() + '/hosts'])
                .catch(error =>  console.error('asdasdasdasdasd'));
            });
    }
}
