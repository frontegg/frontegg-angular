import { Injectable } from '@angular/core';
import { CoreService } from '@frontegg/ng-core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private codeService: CoreService) {

    debugger;
  }
}
