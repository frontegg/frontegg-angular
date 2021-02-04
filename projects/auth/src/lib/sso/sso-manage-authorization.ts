import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { SSO } from '@frontegg/react-auth';
import { FronteggBaseComponent } from '@frontegg/ng-core';

@Component({
  selector: 'fe-auth-sso-manage-authorization',
  template: ` <ng-content></ng-content>`,
})
export class SsoManageAuthorization extends FronteggBaseComponent implements AfterViewInit {
  @Input() rootPath: string;

  constructor(protected elem: ElementRef) {
    super(elem);
    this.name = 'SSO.ManageAuthorizationPage';
  }

  ngAfterViewInit(): void {
    this.mountElement('SSO.ManageAuthorizationPage', SSO.ManageAuthorizationPage);
  }
}
