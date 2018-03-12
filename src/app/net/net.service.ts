import { Net }          from './net';

import {Observable}     from 'rxjs/Observable';
import {Http, RequestOptions} from '@angular/http';
import { Injectable }   from '@angular/core';
import {Headers}        from '@angular/http';
import {Globals} from '../globals';




@Injectable()
export class NetService {
    private netAllUrl = this.globals.API_URL + '/api/admin/net/all';
    private netUrl = this.globals.API_URL + '/api/admin/net';
    private netAddUrl = this.globals.API_URL + '/api/admin/net/add';
    private netSearchUrl = this.globals.API_URL + '/api/admin/net/search';
    private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: Http, private globals: Globals) {
  }
    getNets(): Observable<Net[]> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http.get(this.netAllUrl, options).map(response => response.json() as Net[])
            .catch(this.handleError);
    }

    getNet(id: number): Observable<Net> {
      const url = `${this.netUrl}/${id}`;
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http.get(url, options)
            .map(response => response.json() as Net)
            .catch(this.handleError);
    }

    create(net: Net): Observable<Net> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http
            .post(this.netAddUrl, JSON.stringify(net), options)
            .map(response => response.json() as Net)
            .catch(this.handleError);
    }

    search(term: string): Observable<Net[]> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http
            .get(`${this.netSearchUrl}=${term}`, options)
            .map(response => response.json().data as Net[]);
    }

    delete(id: number): Observable<void> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        const url = `${this.netUrl}/${id}`;
        return this.http.delete(url, options)
            .map(() => null)
            .catch(this.handleError);
    }

  public handleError = (error: Response) => {
    return Observable.throw(error.status);
  }
}
