import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { ConnectivityContent } from '@frontegg/react-connectivity';
import { FronteggBaseComponent } from '@frontegg/ng-core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fe-connectivity-content',
  template: ``,
})
export class ConnectivityContentComponent
  extends FronteggBaseComponent
  implements AfterViewInit {
  constructor(protected elem: ElementRef, private route: ActivatedRoute) {
    super(elem);
    this.name = 'ConnectivityContent';
  }

  ngAfterViewInit(): void {
    this.mountElement('ConnectivityContent', ConnectivityContent, {
      rootPath: this.findActiveRoute(this.route),
    });
  }
}
