import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { LoginPage } from '@frontegg/react-auth';
import { FronteggBaseComponent } from '@frontegg/ng-core';

@Component({
  selector: 'fe-auth-login-page',
  template: ``,
})
export class LoginPageComponent extends FronteggBaseComponent implements AfterViewInit {
  constructor(protected elem: ElementRef) {
    super(elem);
  }

  ngAfterViewInit(): void {
    this.mountElement('LoginPage', LoginPage);
  }
}
