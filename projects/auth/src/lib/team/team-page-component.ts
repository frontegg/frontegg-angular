import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { Team } from '@frontegg/react-auth';
import { FronteggBaseComponent } from '@frontegg/ng-core';
import { ActivatedRoute } from '@angular/router';
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
    this.name = 'Team.Page';
  }

  ngAfterViewInit(): void {
    this.mountElement<TeamPageProps>('Team.Page', Team.Page, {
      rootPath: this.rootPath ?? this.findActiveRoute(this.route),
    });
  }
}
