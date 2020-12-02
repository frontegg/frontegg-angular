import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { SMSComponent } from '@frontegg/react-connectivity';
import { FronteggBaseComponent } from '@frontegg/ng-core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fe-connectivity-email',
  template: ``,
})
export class ConnectivitySMSComponent
  extends FronteggBaseComponent
  implements AfterViewInit {
  constructor(protected elem: ElementRef, private route: ActivatedRoute) {
    super(elem);
    this.name = 'ConnectivitySMSComponent';
  }

  ngAfterViewInit(): void {
    this.mountElement('SMSComponent', SMSComponent, {
      rootPath: this.findActiveRoute(this.route),
    });
  }
}
