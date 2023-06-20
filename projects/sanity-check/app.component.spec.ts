import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FronteggAppModule } from 'frontegg-angular-16';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FronteggAppModule.forRoot(
          {
            contextOptions: {
              baseUrl: 'https://app-1p3iny7ql1ng.frontegg.com',
              clientId: 'f7094875-fa3b-48ab-b76f-3598095d2780',
            },
            hostedLoginBox: true,
          },
        ),
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Frontegg - Angular');
  });
});
