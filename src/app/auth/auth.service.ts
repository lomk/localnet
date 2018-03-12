import {Http, RequestOptions} from '@angular/http';
import { Injectable }   from '@angular/core';
import {Headers}        from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {Globals} from '../globals';
import {User} from '../user/user';


@Injectable()
export class AuthService {


  private currentUserUrl = this.globals.API_URL + '/logon/getUser';
  // private isAuthenticatedUrl = this.globals.API_URL + '/logon/isAuthenticated';
  private loginUrl = this.globals.API_URL + '/login';
  private logoutUrl = this.globals.API_URL + '/logout';
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(private http: Http, private globals: Globals) {
  }

  getCurrentUser(): Observable<any> {
    const options = new RequestOptions();
    options.withCredentials = true;
    options.headers = this.headers;

    return this.http.get(this.currentUserUrl, options)
      .map(response => {
        if (response.status === 200) {
          return response.json() as User;
        }
      })
      .catch(this.handleError);
  }

  isAuthenticated(): boolean {
    let result = false;
    const options = new RequestOptions();
    options.withCredentials = true;
    options.headers = this.headers;
    this.http.get(this.currentUserUrl, options)
      .map(response => {
        if (response.status === 200) {
          result = true;
        }
      }).catch(this.handleError);
    return result;
  }

  isAdmin(): boolean {
    let result = false;
    const options = new RequestOptions();
    options.withCredentials = true;
    options.headers = this.headers;
    this.http.get(this.currentUserUrl, options)
      .map(response => {
        console.log('44444444444444444');
        if (response.status === 200) {
          console.log(response.json());
          if ( response.json().role.name === 'ADMIN' ) {
            console.log('TRUE')
            result = true;
            return true;
          }
        }
      }).catch(this.handleError);
    console.log('111111TRUE')
    return result;
  }

  login(username: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    body.set('submit', 'Login');
    const options = new RequestOptions();
    options.withCredentials = true;
    options.headers = this.headers;

    return this.http
      .post(this.loginUrl, body.toString(), options)
      .map(response => {
        return response.json() as User;
      })
      .catch(this.handleError);
  }

  logout(): Observable<void> {
    const options = new RequestOptions();
    options.withCredentials = true;
    options.headers = this.headers;

    return this.http
      .get(this.logoutUrl,  options)
      .map(response => { console.log(response.toString());
      })
      .catch(this.handleError);
  }

  public handleError = (error: Response) => {
    console.log('erooro2')
    return Observable.throw(error.status);
  }
}

