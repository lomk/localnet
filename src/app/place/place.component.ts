import { Component, OnInit } from '@angular/core';

import { Place } from './place';
import { PlaceService } from './place.service';
import {Router} from '@angular/router';
import {User} from '../user/user';

@Component({
    selector: 'app-places',
    templateUrl: './place.component.html' ,
    providers: [PlaceService]
})
export class PlaceComponent implements OnInit {
    currentUser: User;
    places: Place[];
    selectedPlace: Place;

    constructor(
        private router: Router,
        private placeService: PlaceService) { this.currentUser = JSON.parse(localStorage.getItem('currentUser'));}

    getPlaces(): void {
        this.placeService.getPlaces().subscribe(places => this.places = places,
          error => {
            if ( error === 401 ) {
              this.router.navigate(['/login']);
            }
          });
    }


    delete(place: Place): void {
        this.placeService
            .delete(place.id)
            .subscribe(() => {
                this.places = this.places.filter(h => h !== place);
                if (this.selectedPlace === place) { this.selectedPlace = null; }
            });
    }

    ngOnInit(): void {
        this.getPlaces();
    }

    onSelect(place: Place): void {
        this.selectedPlace = place;
    }

    goToDetail(): void {
        this.router.navigate(['/place-details', this.selectedPlace.id]);
    }
}
