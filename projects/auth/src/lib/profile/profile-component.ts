import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { Profile } from '@frontegg/react-auth';
import { FronteggBaseComponent } from '@frontegg/ng-core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fe-auth-profile',
  template: ``,
})
export class ProfileComponent extends FronteggBaseComponent implements AfterViewInit {
  constructor(protected elem: ElementRef, private route: ActivatedRoute) {
    super(elem);
  }

  ngAfterViewInit(): void {
    this.mountElement('Profile.Page', Profile.Page, {
      rootPath: this.findActiveRoute(this.route),
    });
  }
}
