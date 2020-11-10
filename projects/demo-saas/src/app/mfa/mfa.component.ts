import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mfa',
  templateUrl: './mfa.component.html',
})
export class MfaComponent implements OnInit {
  title: string = 'Multi-factor Authentication';

  constructor() { }

  ngOnInit(): void {
  }

}
