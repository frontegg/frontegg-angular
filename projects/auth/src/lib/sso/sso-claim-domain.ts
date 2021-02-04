import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { SSO } from '@frontegg/react-auth';
import { FronteggBaseComponent } from '@frontegg/ng-core';

@Component({
  selector: 'fe-auth-sso-claim-domain',
  template: ` <ng-content></ng-content>`,
})
export class SsoClaimDomainComponent extends FronteggBaseComponent implements AfterViewInit {
  @Input() rootPath: string;

  constructor(protected elem: ElementRef) {
    super(elem);
    this.name = 'SSO.ClaimDomainPage';
  }

  ngAfterViewInit(): void {
    this.mountElement('SSO.ClaimDomainPage', SSO.ClaimDomainComponent);
  }
}
