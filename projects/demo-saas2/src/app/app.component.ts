import { Component } from '@angular/core';
import { ContextHolder } from '@frontegg/rest-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'demo-saas2';

  test = ContextHolder.getUser()?.email;
}
