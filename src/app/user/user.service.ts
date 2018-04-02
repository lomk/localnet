import { User }         from './user';

import {Http, RequestOptions} from '@angular/http';
import { Injectable }   from '@angular/core';
import {Headers}        from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {Globals} from '../globals';

@Injectable()
export class UserService {
    private userAllUrl = this.globals.API_URL + '/api/admin/user/all';
    private userUrl = this.globals.API_URL + '/api/admin/user';
    private userAddUrl = this.globals.API_URL + '/api/admin/user/add';
    private userSearchUrl = this.globals.API_URL + '/api/admin/user/search';
    private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: Http, private globals: Globals) {
  }
    getUsers(): Observable<User[]> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;

        return this.http.get(this.userAllUrl, options)
            .map(response => response.json() as User[])
            .catch(this.handleError);
    }

    getUser(id: number): Observable<User> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        const url = `${this.userUrl}/${id}`;
        return this.http.get(url, options)
            .map(response => response.json() as User)
            .catch(this.handleError);
    }

    create(user: User): Observable<User> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
      console.log(JSON.stringify(user));
        return this.http
            .post(this.userAddUrl, JSON.stringify(user), options)
            .map(response => response.json() as User)
            .catch(this.handleError);
    }

    search(term: string): Observable<User[]> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http
            .get(`${this.userSearchUrl}=${term}`, options)
            .map(response => response.json().data as User[]);
    }

    delete(id: number): Observable<void> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        const url = `${this.userUrl}/${id}`;
        return this.http.delete(url, options)
            .map(() => null)
            .catch(this.handleError);
    }

  public handleError = (error: Response) => {
    return Observable.throw(error.status);
  }
}
