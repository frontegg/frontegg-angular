import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { Team } from '@frontegg/react-auth';
import { FronteggBaseComponent } from '@frontegg/ng-core';

@Component({
  selector: 'fe-auth-team-header',
  template: ``,
})
export class TeamHeaderComponent extends FronteggBaseComponent implements AfterViewInit {
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
    this.mountElement<any>('Team.Header', Team.Header, {
      className: this.className,
      title: this.title,
      titleClassName: this.titleClassName,
      subTitle: this.subTitle,
      childClassName: this.childClassName,
      onBackButtonClick: this.onBackButtonClick,
    });
  }
}
