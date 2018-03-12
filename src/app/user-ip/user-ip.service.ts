import { UserIp }         from './user-ip';

import {Http, RequestOptions} from '@angular/http';
import { Injectable }   from '@angular/core';
import {Headers}        from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {Globals} from '../globals';

@Injectable()
export class UserIpService {
    private userIpAllUrl = this.globals.API_URL + '/api/admin/userIp/all';
    private userIpUrl = this.globals.API_URL + '/api/admin/userIp';
    private userIpAddUrl = this.globals.API_URL + '/api/admin/userIp/add';
    private userIpSearchUrl = this.globals.API_URL + '/api/admin/userIp/search';
    private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private globals: Globals) {
  }
    getUserIps(): Observable<UserIp[]> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http.get(this.userIpAllUrl, options)
            .map(response => response.json() as UserIp[])
            .catch(this.handleError);
    }

    getUserIp(id: number): Observable<UserIp> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        const url = `${this.userIpUrl}/${id}`;
        return this.http.get(url, options)
            .map(response => response.json() as UserIp)
            .catch(this.handleError);
    }

    create(userIp: UserIp): Observable<UserIp> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http
            .post(this.userIpAddUrl, JSON.stringify(userIp), options)
            .map(response => response.json() as UserIp)
            .catch(this.handleError);
    }

    search(term: string): Observable<UserIp[]> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http
            .get(`${this.userIpSearchUrl}=${term}`, options)
            .map(response => response.json().data as UserIp[]);
    }

    delete(id: number): Observable<void> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        const url = `${this.userIpUrl}/${id}`;
        return this.http.delete(url, options)
            .map(() => null)
            .catch(this.handleError);
    }

  public handleError = (error: Response) => {
    return Observable.throw(error.status);
  }
}
