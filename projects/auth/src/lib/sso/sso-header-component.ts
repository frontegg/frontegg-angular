import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { SSO } from '@frontegg/react-auth';
import { FronteggBaseComponent } from '@frontegg/ng-core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageHeaderProps } from '@frontegg/react-core';

@Component({
  selector: 'fe-auth-sso-header',
  template: ``,
})
export class SsoHeaderComponent extends FronteggBaseComponent implements OnInit, AfterViewInit {
  @Input() className: string;
  @Input() title: string;
  @Input() titleClassName: string;
  @Input() subTitle?: string;
  @Input() childClassName?: string;
  @Input() onBackButtonClick?: (e) => void;

  constructor(protected elem: ElementRef) {
    super(elem);
    console.log('TT', 'SSO.Header', 'constructor');
  }

  ngOnInit(): void {
    console.log('TT', 'SSO.Header', 'ngInit');
    let parent = this.elem.nativeElement.parentElement;
    while (parent != null && !parent.ngClass) {
      parent = parent.parentElement;
    }
    parent.ngClass.registerChild(this);
    console.log('TT', 'SSO.Header', 'parent: ', parent.ngClass.cc);
  }


  ngAfterViewInit(): void {
    console.log('TT', 'SSO.Header', 'ngAfterViewInit');
    this.mountElement<PageHeaderProps>('SSO.Header', SSO.Header, {});
  }
}
