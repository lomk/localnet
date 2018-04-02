import {Component, OnInit}      from '@angular/core';
import {PlaceService}            from './place.service';
import {Place}                   from './place';
import {Router}                 from '@angular/router';
import {NgForm}                 from '@angular/forms';
import {User} from '../user/user';


@Component({
    selector: 'app-place-form',
    templateUrl: './place-form.component.html',
    providers: [ PlaceService]
})
export class PlaceFormComponent implements OnInit {
  currentUser: User;
  place = new Place();
  error: String;

    constructor(private router: Router,
                private placeService: PlaceService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit(): void {
    }

    goToDetail(): void {
        this.router.navigate(['/place-details']);
    }

    onFormSubmit(form: NgForm) {
        const newPlace = new Place();
        newPlace.name = form.controls['name'].value;
        this.placeService.create(newPlace)
            .subscribe(place => {
              this.place = place;
              this.router.navigate([this.currentUser.role.name.toLowerCase() + '/places'])
                .catch(error =>  console.error('asdasdasdasdasd'));
            });
    }
}
