import { Component } from '@angular/core';
import { CoreService } from '@frontegg/ng-core';
import { AuthService } from '@frontegg/ng-auth';

const developmentHosts = ['localhost', 'local.frontegg.com'];
const host =
  developmentHosts.indexOf(window.location.hostname) !== -1
    ? `${window.location.hostname}:8080`
    : window.location.hostname;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public coreService: CoreService, public authService: AuthService) {
  }

}
