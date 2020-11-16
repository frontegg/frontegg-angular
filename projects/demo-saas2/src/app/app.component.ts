import { Component } from '@angular/core';
import { ContextHolder } from '@frontegg/rest-api';

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
  title = 'demo-saas';
  ddd = {
    baseUrl: `${window.location.protocol}//${host}`,
    requestCredentials: 'include',
  };

  test = ContextHolder.getUser()?.email;
}
