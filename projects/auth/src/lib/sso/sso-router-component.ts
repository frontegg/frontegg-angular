import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { SSO } from '@frontegg/react-auth';
import { FronteggBaseComponent } from '@frontegg/ng-core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fe-auth-sso-router',
  template: `<ng-content></ng-content>`,
})
export class SsoRouterComponent extends FronteggBaseComponent implements AfterViewInit {

  constructor(protected elem: ElementRef, private route: ActivatedRoute) {
    super(elem);
  }

  ngAfterViewInit(): void {
    this.mountElement(SSO.Router, { rootPath: this.findActiveRoute(this.route) });
  }
}
