import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { Profile } from '@frontegg/react-auth';
import { FronteggBaseComponent } from '@frontegg/ng-core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fe-auth-mfa',
  template: ``,
})
export class MfaComponent extends FronteggBaseComponent implements AfterViewInit {

  constructor(protected elem: ElementRef, private route: ActivatedRoute) {
    super(elem);
  }

  ngAfterViewInit(): void {
    this.mountElement('Profile.MfaPage', Profile.MfaPage);
  }
}
