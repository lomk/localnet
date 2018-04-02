import { Component } from '@angular/core';

import                  'rxjs/add/operator/catch';
import                  'rxjs/add/operator/map';
import                  'rxjs/add/operator/toPromise';
import                  'rxjs/add/observable/throw';

@Component({
    selector: 'app-pipe',
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = 'Local net';
}
