import { QueueType }     from './queue-type';
import {Http, RequestOptions} from '@angular/http';
import { Injectable }   from '@angular/core';
import {Headers}        from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import {Globals} from '../globals';

@Injectable()
export class QueueTypeService {
    private testerQueueTypeAllUrl = this.globals.API_URL + '/api/tester/queueType/all';
    private queueTypeAllUrl = this.globals.API_URL + '/api/admin/queueType/all';
    private queueTypeUrl = this.globals.API_URL + '/api/admin/queueType';
    private queueTypeAddUrl = this.globals.API_URL + '/api/admin/queueType/add';
    private queueTypeSearchUrl = this.globals.API_URL + '/api/admin/queueType/search';
    private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: Http, private globals: Globals) {
  }
    getQueueTypes(): Observable<QueueType[]> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http.get(this.queueTypeAllUrl, options)
          .map(response => response.json() as QueueType[])
          .catch(this.handleError);
    }

  getTesterQueueTypes(): Observable<QueueType[]> {
    const options = new RequestOptions();
    options.withCredentials = true;
    options.headers = this.headers;
    return this.http.get(this.testerQueueTypeAllUrl, options)
      .map(response => response.json() as QueueType[])
      .catch(this.handleError);
  }

    getQueueType(id: number): Observable<QueueType> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        const url = `${this.queueTypeUrl}/${id}`;
        return this.http.get(url, options)
            .map(response => response.json() as QueueType)
            .catch(this.handleError);
    }

    create(queueType: QueueType): Observable<QueueType> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http
            .post(this.queueTypeAddUrl, JSON.stringify(queueType), options)
            .map(response => response.json() as QueueType)
            .catch(this.handleError);
        // .catch(response => Observable.throw(response.json()));
    }

    search(term: string): Observable<QueueType[]> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        return this.http
            .get(`${this.queueTypeSearchUrl}=${term}`, options)
            .map(response => response.json().data as QueueType[]);
    }

    delete(id: number): Observable<void> {
      const options = new RequestOptions();
      options.withCredentials = true;
      options.headers = this.headers;
        const url = `${this.queueTypeUrl}/${id}`;
        return this.http.delete(url, options)
            .map(() => null)
            .catch(this.handleError);
    }

  public handleError = (error: Response) => {
    return Observable.throw(error.status);
  }
}
