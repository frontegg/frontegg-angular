import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { SSO } from '@frontegg/react-auth';
import { FronteggBaseComponent } from '@frontegg/ng-core';
import { ActivatedRoute } from '@angular/router';
import { SwitchToggleProps } from '@frontegg/react-core';

@Component({
  selector: 'fe-auth-sso-toggle',
  template: ``,
})
export class SsoToggleComponent extends FronteggBaseComponent implements AfterViewInit {

  constructor(protected elem: ElementRef, private route: ActivatedRoute) {
    super(elem);
  }

  ngAfterViewInit(): void {
    this.mountElement<SwitchToggleProps>(SSO.Toggle, {});
  }
}
