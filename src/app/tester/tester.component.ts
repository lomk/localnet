import { Component } from '@angular/core';

import                  'rxjs/add/operator/catch';
import                  'rxjs/add/operator/map';
import                  'rxjs/add/operator/toPromise';
import                  'rxjs/add/observable/throw';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html'
})
export class TesterComponent {
  title = 'User home';
  content = 'User main page';
}
