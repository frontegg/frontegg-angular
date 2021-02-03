import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { SSO } from '@frontegg/react-auth';
import { FronteggBaseComponent } from '@frontegg/ng-core';
import { ActivatedRoute } from '@angular/router';
import { SSOProps } from '@frontegg/react-auth/SSO/SSORouter';

@Component({
  selector: 'fe-auth-sso',
  template: ` <ng-content></ng-content>`,
})
export class SsoAuthComponent extends FronteggBaseComponent implements AfterViewInit {
  @Input() rootPath: string;

  constructor(protected elem: ElementRef, private route: ActivatedRoute) {
    super(elem);
    this.name = 'SSO.Router';
  }

  ngAfterViewInit(): void {
    this.mountElement<SSOProps>('SSO.Router', SSO.Router, {
      rootPath: this.rootPath ?? this.findActiveRoute(this.route),
    });
  }
}
