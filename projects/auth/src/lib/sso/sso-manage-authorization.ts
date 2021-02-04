import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { SSO } from '@frontegg/react-auth';
import { FronteggBaseComponent } from '@frontegg/ng-core';

@Component({
  selector: 'fe-auth-sso-manage-authorization',
  template: ` <ng-content></ng-content>`,
})
export class SsoManageAuthorizationComponent extends FronteggBaseComponent implements AfterViewInit {
  @Input() rootPath: string;

  constructor(protected elem: ElementRef) {
    super(elem);
    this.name = 'SSO.ManageAuthorizationComponent';
  }

  ngAfterViewInit(): void {
    this.mountElement('SSO.ManageAuthorizationComponent', SSO.ManageAuthorizationComponent);
  }
}
