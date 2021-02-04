import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { SSO } from '@frontegg/react-auth';
import { FronteggBaseComponent } from '@frontegg/ng-core';

@Component({
  selector: 'fe-auth-sso-configure-idp',
  template: ` <ng-content></ng-content>`,
})
export class SsoConfigureIDPComponent extends FronteggBaseComponent implements AfterViewInit {
  @Input() rootPath: string;

  constructor(protected elem: ElementRef) {
    super(elem);
    this.name = 'SSO.ConfigureIDPPage';
  }

  ngAfterViewInit(): void {
    this.mountElement('SSO.ConfigureIDPPage', SSO.ConfigureIDPPage);
  }
}
