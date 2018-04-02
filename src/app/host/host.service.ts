import { Host }      from './host';

import {Http, RequestOptions, Response} from '@angular/http';
import {APP_ID, Injectable} from '@angular/core';
import {Headers}        from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Globals}        from '../globals';
import {Place} from '../place/place';

@Injectable()
export class HostService {
    private hostAllUrl =  this.globals.API_URL + '/api/admin/host/all';
    private hostUrl = this.globals.API_URL + '/api/admin/host';
    private hostAddUrl = this.globals.API_URL + '/api/admin/host/add';
    private hostUpdUrl = this.globals.API_URL + '/api/admin/host/update';
    private hostDelUrl = this.globals.API_URL + '/api/admin/host/delete';
    private hostSearchUrl = this.globals.API_URL + '/api/admin/host/search';
    private hostPingUrl = this.globals.API_URL + '/api/admin/scan/ping';
    private hostWakeUrl = this.globals.API_URL + '/api/admin/scan/wake';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http, private globals: Globals) {
    }
    getHosts(): Observable<Host[]> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http.get(this.hostAllUrl, options)
            .map(response => {
              if (response.status === 200) {
                return response.json() as Host[];
              }
            })
            .catch(this.handleError);
    }

    getHost(id: number): Observable<Host> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        const url = `${this.hostUrl}/${id}`;
        return this.http.get(url, options)
            .map(response => response.json() as Host)
            .catch(this.handleError);
    }

  subscribeHost(id: number): Observable<Host> {
    const options = new RequestOptions();
    options.withCredentials = true;
    options.headers = this.headers;
    const url = `${this.hostUrl}/${id}`;
    return Observable.interval(20000)
      .flatMap(() => this.http.get(url, options)
      .map(response => response.json() as Host)
      .catch(this.handleError));
    }



    create(host: Host): Observable<any> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http
            .post(this.hostAddUrl, JSON.stringify(host), options)
            .map(response => response.json() as Host)
            .catch(this.handleError);
    }

  update(host: Host): Observable<any> {
    const options = new RequestOptions();
    options.withCredentials = true;
    options.headers = this.headers;
    const place: Place = host.place;
    console.log(JSON.stringify(host));
    return this.http
      .post(this.hostUpdUrl + '/' + host.id, JSON.stringify(host), options)
      .map(response => response.json() as Host)
      .catch(this.handleError);
  }

    search(term: string): Observable<Host[]> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http
            .get(`${this.hostSearchUrl}=${term}`, options)
            .map(response => {
              return response.json().data as Host[];
            });
    }

    delete(id: number): Observable<void> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        const url = `${this.hostDelUrl}/${id}`;
        return this.http.delete(url, options)
            .map(() => null)
            .catch(this.handleError);
    }
    ping(id: number): Observable<Host> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
      return this.http
        .get(`${this.hostPingUrl}/${id}`, options)
        .map(response => response.json() as Host);
    }

  wake(id: number): Observable<String> {
    const options = new RequestOptions();
    options.withCredentials = true;
    options.headers = this.headers;
    return this.http
      .get(`${this.hostWakeUrl}/${id}`, options)
      .map(response => {
        return response.json().data as String;
      });
  }

    public handleError = (error: Response) => {
        return Observable.throw(error);
    }
}
