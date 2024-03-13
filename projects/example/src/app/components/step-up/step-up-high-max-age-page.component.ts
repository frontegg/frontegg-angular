import { Component } from '@angular/core';
import { BaseStepUp } from './base-step-up/base-step-up.component';

@Component({
  selector: 'step-up-high-max-age-page',
  templateUrl: './base-step-up/base-step-up.component.html',
  styleUrls: ['./base-step-up/base-step-up.component.scss'],
})
export class StepUpHighMaxAgePage extends BaseStepUp {
  maxAge = 5000;
}
