import { RemoteIp }     from './remote-ip';
import {Http, RequestOptions} from '@angular/http';
import { Injectable }   from '@angular/core';
import {Headers}        from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import {Globals} from '../globals';

@Injectable()
export class RemoteIpService {

  private testerRemoteIpAllUrl = this.globals.API_URL + '/api/tester/remoteIp/all';
  private testerRemoteIpUrl = this.globals.API_URL + '/api/tester/remoteIp';
  private testerRemoteIpAddUrl = this.globals.API_URL + '/api/tester/remoteIp/add';
  private testerRemoteIpSearchUrl = this.globals.API_URL + '/api/tester/remoteIp/search';
    private remoteIpAllUrl = this.globals.API_URL + '/api/admin/remoteIp/all';
    private remoteIpUrl = this.globals.API_URL + '/api/admin/remoteIp';
    private remoteIpAddUrl = this.globals.API_URL + '/api/admin/remoteIp/add';
    private remoteIpSearchUrl = this.globals.API_URL + '/api/admin/remoteIp/search';
    private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: Http, private globals: Globals) {
  }
    // Get data whit Promise
    // getRemoteIps(): Promise<RemoteIp[]> {
    //     return this.http.get(this.remoteIpAllUrl)
    //         .toPromise()
    //         .then(response => response.json() as RemoteIp[])
    //         .catch(this.handleError);
    // }
    getRemoteIps(): Observable<RemoteIp[]> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http.get(this.remoteIpAllUrl, options)
          .map(response => response.json() as RemoteIp[])
          .catch(this.handleError);
    }

  getTesterRemoteIps(): Observable<RemoteIp[]> {
    const options = new RequestOptions();
    options.withCredentials = true;
    options.headers = this.headers;
    return this.http.get(this.testerRemoteIpAllUrl, options)
      .map(response => response.json() as RemoteIp[])
      .catch(this.handleError);
  }

    // Get data whit Promise
    // getRemoteIps(): Promise<RemoteIp[]> {
    //     return this.http.get(this.remoteIpAllUrl)
    //         .toPromise()
    //         .then(response => response.json() as RemoteIp[])
    //         .catch(this.handleError);
    // }
    // getRemoteIp(id: number): Promise<RemoteIp> {
    //     const url = `${this.remoteIpUrl}/${id}`;
    //     return this.http.get(url)
    //         .toPromise()
    //         .then(response => response.json() as RemoteIp)
    //         .catch(this.handleError);
    // }

    getRemoteIp(id: number): Observable<RemoteIp> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        const url = `${this.remoteIpUrl}/${id}`;
        return this.http.get(url, options)
            .map(response => response.json() as RemoteIp)
            .catch(this.handleError);
    }

  getTesterRemoteIp(id: number): Observable<RemoteIp> {
    const options = new RequestOptions();
    options.withCredentials = true;
    options.headers = this.headers;
    const url = `${this.testerRemoteIpUrl}/${id}`;
    return this.http.get(url, options)
      .map(response => response.json() as RemoteIp)
      .catch(this.handleError);
  }

    // create(remoteIp: RemoteIp): Promise<RemoteIp> {
    //     return this.http
    //         .post(this.remoteIpAddUrl, JSON.stringify(remoteIp), {headers: this.headers})
    //         .toPromise()
    //         .then(response => response.json() as RemoteIp)
    //         .catch(this.handleError);
    // }
    create(remoteIp: RemoteIp): Observable<RemoteIp> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http
            .post(this.remoteIpAddUrl, JSON.stringify(remoteIp), options)
            .map(response => response.json() as RemoteIp)
            .catch(this.handleError);
        // .catch(response => Observable.throw(response.json()));
    }

  createTesterRemoteIp(remoteIp: RemoteIp): Observable<RemoteIp> {
    const options = new RequestOptions();
    options.withCredentials = true;
    options.headers = this.headers;
    return this.http
      .post(this.testerRemoteIpAddUrl, JSON.stringify(remoteIp), options)
      .map(response => response.json() as RemoteIp)
      .catch(this.handleError);
    // .catch(response => Observable.throw(response.json()));
  }

    search(term: string): Observable<RemoteIp[]> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http
            .get(`${this.remoteIpSearchUrl}=${term}`, options)
            .map(response => response.json().data as RemoteIp[]);
    }

    delete(id: number): Observable<void> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        const url = `${this.remoteIpUrl}/${id}`;
        return this.http.delete(url, options)
            .map(() => null)
            .catch(this.handleError);
    }

  deleteTesterRemoteIp(id: number): Observable<void> {
    const options = new RequestOptions();
    options.withCredentials = true;
    options.headers = this.headers;
    const url = `${this.testerRemoteIpUrl}/${id}`;
    return this.http.delete(url, options)
      .map(() => null)
      .catch(this.handleError);
  }

    // private handleError(error: any): Observable<any> {
    //     // console.error('An error occurred', error); // for demo purposes only
    //     return Observable.throw(error);
    // }
  public handleError = (error: Response) => {
    return Observable.throw(error.status);
  }
}
