import { Place }         from './place';
import {Http, RequestOptions} from '@angular/http';
import { Injectable }   from '@angular/core';
import {Headers}        from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {Globals} from '../globals';

@Injectable()
export class PlaceService {
    private placeAllUrl = this.globals.API_URL + '/api/admin/place/all';
    private placeUrl = this.globals.API_URL + '/api/admin/place';
    private placeAddUrl = this.globals.API_URL + '/api/admin/place/add';
    private placeSearchUrl = this.globals.API_URL + '/api/admin/place/search';
    private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: Http, private globals: Globals) {
  }

    getPlaces(): Observable<Place[]> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http.get(this.placeAllUrl, options)
          .map(response => response.json() as Place[])
          .catch(this.handleError);
    }

    getPlace(id: number): Observable<Place> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        const url = `${this.placeUrl}/${id}`;
        return this.http.get(url, options)
            .map(response => response.json() as Place)
            .catch(this.handleError);
    }

    create(place: Place): Observable<Place> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http
            .post(this.placeAddUrl, JSON.stringify(place), options)
            .map(response => response.json() as Place)
            .catch(this.handleError);
        // .catch(response => Observable.throw(response.json()));
    }



    search(term: string): Observable<Place[]> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http
            .get(`${this.placeSearchUrl}=${term}`, options)
            .map(response => response.json().data as Place[]);
    }

    delete(id: number): Observable<void> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        const url = `${this.placeUrl}/${id}`;
        return this.http.delete(url, options)
            .map(() => null)
            .catch(this.handleError);
    }

  public handleError = (error: Response) => {
    return Observable.throw(error.status);
  }
}
