import { Role }         from './role';
import {Http, RequestOptions} from '@angular/http';
import { Injectable }   from '@angular/core';
import {Headers}        from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {Globals} from '../globals';

@Injectable()
export class RoleService {
    private roleAllUrl = this.globals.API_URL + '/api/admin/role/all';
    private roleUrl = this.globals.API_URL + '/api/admin/role';
    private roleAddUrl = this.globals.API_URL + '/api/admin/role/add';
    private roleSearchUrl = this.globals.API_URL + '/api/admin/role/search';
    private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: Http, private globals: Globals) {
  }

    getRoles(): Observable<Role[]> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http.get(this.roleAllUrl, options)
          .map(response => response.json() as Role[])
          .catch(this.handleError);
    }

    getRole(id: number): Observable<Role> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        const url = `${this.roleUrl}/${id}`;
        return this.http.get(url, options)
            .map(response => response.json() as Role)
            .catch(this.handleError);
    }

    create(role: Role): Observable<Role> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http
            .post(this.roleAddUrl, JSON.stringify(role), options)
            .map(response => response.json() as Role)
            .catch(this.handleError);
        // .catch(response => Observable.throw(response.json()));
    }

    search(term: string): Observable<Role[]> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http
            .get(`${this.roleSearchUrl}=${term}`, options)
            .map(response => response.json().data as Role[]);
    }

    delete(id: number): Observable<void> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        const url = `${this.roleUrl}/${id}`;
        return this.http.delete(url, options)
            .map(() => null)
            .catch(this.handleError);
    }

  public handleError = (error: Response) => {
    return Observable.throw(error.status);
  }
}
