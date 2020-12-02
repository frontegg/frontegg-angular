import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { SlackComponent } from '@frontegg/react-connectivity';
import { FronteggBaseComponent } from '@frontegg/ng-core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fe-connectivity-email',
  template: ``,
})
export class ConnectivitySlackComponent
  extends FronteggBaseComponent
  implements AfterViewInit {
  constructor(protected elem: ElementRef, private route: ActivatedRoute) {
    super(elem);
    this.name = 'ConnectivitySlackComponent';
  }

  ngAfterViewInit(): void {
    this.mountElement('SlackComponent', SlackComponent, {
      rootPath: this.findActiveRoute(this.route),
    });
  }
}
