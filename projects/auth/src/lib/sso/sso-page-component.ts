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
export class SsoPageComponent extends FronteggBaseComponent implements OnInit, AfterViewInit {
  @Input() rootPath: string;

  constructor(protected elem: ElementRef, private route: ActivatedRoute) {
    super(elem);
    console.log('TT', 'SSO.Page', 'constructor');
  }

  ngOnInit(): void {
    console.log('TT', 'SSO.Page', 'ngInit');
    let parent = this.elem.nativeElement.parentElement;
    while (parent != null && !parent.ngClass) {
      parent = parent.parentElement;
    }
    console.log('TT', 'SSO.Page', 'parent: ', parent);
  }


  ngAfterViewInit(): void {
    console.log('TT', 'SSO.Page', 'ngAfterViewInit');
    this.mountElement<SSOPageProps>('SSO.Page', SSO.Page, {
      rootPath: this.rootPath ?? this.findActiveRoute(this.route),
    });
  }
}
