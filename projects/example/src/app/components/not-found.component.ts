import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div>
      404 not found
    </div>`,
})
export class NotFoundComponent implements OnInit {

  ngOnInit(): void {
    console.log('NotFoundComponent ngOnInit');
  }
}
