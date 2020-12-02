import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { WebhookComponent } from '@frontegg/react-connectivity';
import { FronteggBaseComponent } from '@frontegg/ng-core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fe-connectivity-wehook',
  template: ``,
})
export class ConnectivityWebhookComponent
  extends FronteggBaseComponent
  implements AfterViewInit {
  constructor(protected elem: ElementRef, private route: ActivatedRoute) {
    super(elem);
    this.name = 'ConnectivityWebhookComponent';
  }

  ngAfterViewInit(): void {
    this.mountElement('WebhookComponent', WebhookComponent, {
      rootPath: this.findActiveRoute(this.route),
    });
  }
}
