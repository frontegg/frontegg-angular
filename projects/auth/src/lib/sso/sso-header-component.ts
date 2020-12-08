import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { SSO } from '@frontegg/react-auth';
import { FronteggBaseComponent } from '@frontegg/ng-core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageHeaderProps } from '@frontegg/react-core';

@Component({
  selector: 'fe-auth-sso-header',
  template: ``,
})
export class SsoHeaderComponent extends FronteggBaseComponent implements AfterViewInit {
  @Input() className: string;
  @Input() title: string;
  @Input() titleClassName: string;
  @Input() subTitle?: string;
  @Input() childClassName?: string;
  @Input() onBackButtonClick?: (e) => void;

  constructor(protected elem: ElementRef) {
    super(elem);
    this.name = 'SSO.Header';
  }

  ngAfterViewInit(): void {
    console.log('TT', 'SSO.Header', 'ngAfterViewInit');
    this.mountElement<PageHeaderProps>('SSO.Header', SSO.Header, {});
  }
}
