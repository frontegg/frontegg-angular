import { Directive, ElementRef } from '@angular/core';
import { AuthService } from './auth.service';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[fePluginLoader]',
})
export class AuthDirective {
  constructor(private authService: AuthService) {
  }
}
