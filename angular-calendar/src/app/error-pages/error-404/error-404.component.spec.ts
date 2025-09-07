import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Error404Component } from './error-404.component';

describe('Error404Component', () => {
  let component: Error404Component;
  let fixture: ComponentFixture<Error404Component>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Error404Component, RouterTestingModule.withRoutes([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Error404Component);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the 404 error code', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.error-code')?.textContent).toContain('404');
  });

  it('should display the correct error message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Không tìm thấy trang');
  });

  it('should navigate to home when the button is clicked', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const button = fixture.nativeElement.querySelector('.back-button');
    button.click();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
