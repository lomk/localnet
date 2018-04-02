import {PlaceService}             from '../place/place.service';
import {Place}                    from '../place/place';
import {HostService}              from './host.service';
import {Host}                     from './host';
import {Component, OnInit}        from '@angular/core';
import {ActivatedRoute, Router}   from '@angular/router';
import {NgForm}                   from '@angular/forms';
import {NgProgress}               from 'ngx-progressbar';
import {User}                     from '../user/user';


@Component({
    selector: 'app-host-form',
    templateUrl: './host-form.component.html',
    providers: [
        HostService,
        PlaceService]
})
export class HostFormComponent implements OnInit {
    currentUser: User;
    places: Place[];
    error: String;
    host: Host;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private hostService: HostService,
                private ngProgress: NgProgress,
                private placeService: PlaceService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.route.params.subscribe( params => this.getHost(params['id']) );
    }

    getData(): void {
        // this.route.params.subscribe( params => this.getHost(params['id']) );
        this.placeService.getPlaces().subscribe(places => this.places = places);
    }
    ngOnInit(): void {
        this.getData();
    }

  getHost(id: number): void {
    this.ngProgress.start();
    this.hostService.getHost(id).subscribe(host => {this.host = host;
        this.ngProgress.done();
      },
      error => {this.ngProgress.done();
        if ( error.status === 401 ) {
          this.router.navigate(['/login']);
        }
      });
  }

    onFormSubmit(form: NgForm) {
        const newHost = this.host;
        newHost.hostname = form.controls['hostname'].value;
        newHost.customName = form.controls['customName'].value;
        newHost.ipAddress = form.controls['ipAddress'].value;
        newHost.macAddress = form.controls['macAddress'].value;
        newHost.place = form.controls['place'].value;
        console.log(form.controls['place'].value);
      console.log(newHost.place.name);
        this.hostService.update(newHost)
            .subscribe(host => {
              this.host = host;
              this.router.navigate(['admin/hosts'])
                .catch(error =>  console.error('error'));
            });
    }
}
