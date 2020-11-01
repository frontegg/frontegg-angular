import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { SSO } from '@frontegg/react-auth';
import { FronteggBaseComponent } from '@frontegg/ng-core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'fe-auth-sso',
  template: `<ng-content></ng-content>`,
})
export class SsoPageComponent extends FronteggBaseComponent implements AfterViewInit {

  constructor(protected elem: ElementRef, private route: ActivatedRoute) {
    super(elem);
  }

  ngAfterViewInit(): void {
    this.mountElement<any>(SSO.Page, { rootPath: this.findActiveRoute(this.route) });
  }
}
