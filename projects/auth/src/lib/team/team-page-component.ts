import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { Team } from '@frontegg/react-auth';
import { FronteggBaseComponent } from '@frontegg/ng-core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasePageProps } from '@frontegg/react-auth/interfaces';
import { TeamPageProps } from '@frontegg/react-auth/Team/TeamPage';

@Component({
  selector: 'fe-auth-team',
  template: ``,
})
export class TeamPageComponent extends FronteggBaseComponent implements AfterViewInit {
  @Input() rootPath: string;

  constructor(protected elem: ElementRef, private route: ActivatedRoute) {
    super(elem);
  }

  ngAfterViewInit(): void {
    console.log('happend')
    this.mountElement<TeamPageProps>(Team.Page, {
      rootPath: this.rootPath ?? this.findActiveRoute(this.route),
    });
  }
}
