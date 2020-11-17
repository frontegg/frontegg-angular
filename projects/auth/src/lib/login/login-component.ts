import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { LoginPage } from '@frontegg/react-auth';
import { FronteggBaseComponent } from '@frontegg/ng-core';

@Component({
  selector: 'fe-auth-login',
  template: ``,
})
export class LoginComponent extends FronteggBaseComponent implements AfterViewInit {

  constructor(protected elem: ElementRef) {
    super(elem);
  }

  ngAfterViewInit(): void {
    this.mountElement('Login', LoginPage);
  }
}
