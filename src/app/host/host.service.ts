import { LocalIp }      from './host';

import {Http, RequestOptions, Response} from '@angular/http';
import {APP_ID, Injectable} from '@angular/core';
import {Headers}        from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {Globals}        from '../globals';

@Injectable()
export class LocalIpService {
    private localIpAllUrl =  this.globals.API_URL + '/api/admin/localIp/all';
    private localIpUrl = this.globals.API_URL + '/api/admin/localIp';
    private localIpAddUrl = this.globals.API_URL + '/api/admin/localIp/add';
    private localIpSearchUrl = this.globals.API_URL + '/api/admin/localIp/search';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http, private globals: Globals) {
    }
    getLocalIps(): Observable<LocalIp[]> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http.get(this.localIpAllUrl, options)
            .map(response => {
              if (response.status === 200) {
                return response.json() as LocalIp[];
              }
            })
            .catch(this.handleError);
    }

    getLocalIp(id: number): Observable<LocalIp> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        const url = `${this.localIpUrl}/${id}`;
        return this.http.get(url, options)
            .map(response => response.json() as LocalIp)
            .catch(this.handleError);
    }

    create(localIp: LocalIp): Observable<any> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http
            .post(this.localIpAddUrl, JSON.stringify(localIp), options)
            .map(response => response.json() as LocalIp)
            .catch(this.handleError);
    }

    search(term: string): Observable<LocalIp[]> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http
            .get(`${this.localIpSearchUrl}=${term}`, options)
            .map(response => {
              return response.json().data as LocalIp[];
            });
    }

    delete(id: number): Observable<void> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        const url = `${this.localIpUrl}/${id}`;
        return this.http.delete(url, options)
            .map(() => null)
            .catch(this.handleError);
    }

    public handleError = (error: Response) => {
        return Observable.throw(error);
    }
}
