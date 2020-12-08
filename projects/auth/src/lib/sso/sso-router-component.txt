import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { SSO } from '@frontegg/react-auth';
import { FronteggBaseComponent } from '@frontegg/ng-core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fe-auth-sso-router',
  template: ` <ng-content></ng-content>`,
})
export class SsoRouterComponent extends FronteggBaseComponent implements AfterViewInit {
  @Input() rootPath: string;

  constructor(protected elem: ElementRef, private route: ActivatedRoute) {
    super(elem);
    this.name = 'SSO.Router';
  }

  ngAfterViewInit(): void {
    console.log('TT', 'SSO.Router', 'ngAfterViewInit');
    this.mountElement('SSO.Router', SSO.Router, {
      rootPath: this.rootPath ?? this.findActiveRoute(this.route),
    });
  }
}
