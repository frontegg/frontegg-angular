import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { SSO } from '@frontegg/react-auth';
import { FronteggBaseComponent } from '@frontegg/ng-core';
import { ActivatedRoute, Router } from '@angular/router';

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
  }

  ngAfterViewInit(): void {
    this.mountElement<any>(SSO.Header, {
      className: this.className,
      title: this.title,
      titleClassName: this.titleClassName,
      subTitle: this.subTitle,
      childClassName: this.childClassName,
      onBackButtonClick: this.onBackButtonClick,
    });
  }
}
