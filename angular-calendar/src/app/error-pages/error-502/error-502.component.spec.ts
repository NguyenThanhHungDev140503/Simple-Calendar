import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Error502Component } from './error-502.component';

describe('Error502Component', () => {
  let component: Error502Component;
  let fixture: ComponentFixture<Error502Component>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Error502Component, RouterTestingModule.withRoutes([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Error502Component);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the 502 error code', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.error-code')?.textContent).toContain('502');
  });

  it('should display the correct error message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Lỗi cổng kết nối');
  });

  it('should navigate to home when the button is clicked', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const button = fixture.nativeElement.querySelector('.back-button');
    button.click();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
