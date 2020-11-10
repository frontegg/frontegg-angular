import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { SSO } from '@frontegg/react-auth';
import { FronteggBaseComponent } from '@frontegg/ng-core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasePageProps } from '@frontegg/react-auth/interfaces';
import { SSOPageProps } from '@frontegg/react-auth/SSO/SSOPage';

@Component({
  selector: 'fe-auth-sso',
  template: `
    <ng-content></ng-content>`,
})
export class SsoPageComponent extends FronteggBaseComponent implements AfterViewInit {
  @Input() rootPath: string;

  constructor(protected elem: ElementRef, private route: ActivatedRoute) {
    super(elem);
    this.name = 'SSO.Page';
  }

  ngAfterViewInit(): void {
    this.mountElement<SSOPageProps>('SSO.Page', SSO.Page, {
      rootPath: this.rootPath ?? this.findActiveRoute(this.route),
    });
  }
}
