import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { Profile } from '@frontegg/react-auth';
import { FronteggBaseComponent } from '@frontegg/ng-core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fe-auth-profile',
  template: ``,
})
export class ProfileComponent extends FronteggBaseComponent implements AfterViewInit {
  // @Input() className: string;
  // @Input() title: string;
  // @Input() titleClassName: string;
  // @Input() subTitle?: string;
  // @Input() childClassName?: string;
  // @Input() onBackButtonClick?: (e) => void;

  constructor(protected elem: ElementRef, private route: ActivatedRoute) {
    super(elem);
  }

  ngAfterViewInit(): void {
    this.mountElement(Profile.Page, {
      rootPath: this.findActiveRoute(this.route),
      // className: this.className,
      // title: this.title,
      // titleClassName: this.titleClassName,
      // subTitle: this.subTitle,
      // childClassName: this.childClassName,
      // onBackButtonClick: this.onBackButtonClick,
    });
  }
}
