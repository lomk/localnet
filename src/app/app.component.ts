import { Component } from '@angular/core';

import                  'rxjs/add/operator/catch';
import                  'rxjs/add/operator/map';
import                  'rxjs/add/operator/toPromise';
import                  'rxjs/add/observable/throw';

@Component({
    selector: 'app-pipe',
    templateUrl: './app.component.html',
    // styleUrls:  ['node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class AppComponent {
    title = 'Queue rules';
}
