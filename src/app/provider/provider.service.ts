import { Provider }     from './provider';
import {Http, RequestOptions} from '@angular/http';
import { Injectable }   from '@angular/core';
import {Headers}        from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import {Globals} from '../globals';

@Injectable()
export class ProviderService {
    private providerAllUrl = this.globals.API_URL + '/api/admin/provider/all';
    private providerUrl = this.globals.API_URL + '/api/admin/provider';
    private providerAddUrl = this.globals.API_URL + '/api/admin/provider/add';
    private providerSearchUrl = this.globals.API_URL + '/api/admin/provider/search';
    private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: Http, private globals: Globals) {
  }

    getProviders(): Observable<Provider[]> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http.get(this.providerAllUrl, options).map(response => response.json() as Provider[]).catch(this.handleError);
    }

    getProvider(id: number): Observable<Provider> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        const url = `${this.providerUrl}/${id}`;
        return this.http.get(url, options)
            .map(response => response.json() as Provider)
            .catch(this.handleError);
    }

    create(provider: Provider): Observable<Provider> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http
            .post(this.providerAddUrl, JSON.stringify(provider), options)
            .map(response => response.json() as Provider)
            .catch(this.handleError);
        // .catch(response => Observable.throw(response.json()));
    }

    search(term: string): Observable<Provider[]> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http
            .get(`${this.providerSearchUrl}=${term}`, options)
            .map(response => response.json().data as Provider[]);
    }

    delete(id: number): Observable<void> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        const url = `${this.providerUrl}/${id}`;
        return this.http.delete(url, options)
            .map(() => null)
            .catch(this.handleError);
    }

  public handleError = (error: Response) => {
    return Observable.throw(error.status);
  }
}
