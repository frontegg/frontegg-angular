import { Component, OnInit } from '@angular/core';
import { CoreService } from '@frontegg/ng-core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {

  constructor(public coreService: CoreService) { }

}
