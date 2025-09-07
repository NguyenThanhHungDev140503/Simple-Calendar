import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Error504Component } from './error-504.component';

describe('Error504Component', () => {
  let component: Error504Component;
  let fixture: ComponentFixture<Error504Component>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Error504Component, RouterTestingModule.withRoutes([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Error504Component);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the 504 error code', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.error-code')?.textContent).toContain('504');
  });

  it('should display the correct error message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hết thời gian chờ cổng kết nối');
  });

  it('should navigate to home when the button is clicked', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const button = fixture.nativeElement.querySelector('.back-button');
    button.click();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
