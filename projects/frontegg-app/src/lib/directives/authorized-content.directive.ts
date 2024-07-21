import {
  AfterContentInit,
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { FronteggAuthService } from '../frontegg-auth.service';

@Directive({
  selector: '[authorizedContent]',
})
export class AuthorizedContentDirective implements AfterContentInit {
  private roles: string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private fronteggAuthService: FronteggAuthService,
  ) {
  }

  @Input()
  set authorizedContent(roles: string[]) {
    this.roles = roles;
  }

  ngAfterContentInit(): void {
    this.fronteggAuthService.user$.subscribe((user) => {
      if (user?.roles?.some((role) => this.roles.includes(role.name))) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
