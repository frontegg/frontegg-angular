import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FronteggProviderComponent } from './core.component';

describe('CoreComponent', () => {
  let component: FronteggProviderComponent;
  let fixture: ComponentFixture<FronteggProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FronteggProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FronteggProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
