import { Directive, ElementRef } from '@angular/core';
import { AuditsService } from './audits.service';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[fePluginLoader]',
})
export class AuditsDirective {
  constructor(private auditsService: AuditsService) {
  }
}
