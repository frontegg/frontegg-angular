import { Component } from '@angular/core';
import { CoreService } from '@frontegg/ng-core';
import { AuthService } from '@frontegg/ng-auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public coreService: CoreService, public authService: AuthService) {

    this.coreService.loading$.subscribe((value) => {
      console.log('value', value);
    });
  }

}
