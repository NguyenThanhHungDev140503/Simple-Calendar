import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { errorInterceptor } from './error.interceptor';

describe('errorInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should navigate to /error/404 on 404 error', () => {
    const navigateSpy = spyOn(router, 'navigate');
    httpClient.get('/test').subscribe({
      next: () => fail('should have failed with a 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(404);
        expect(navigateSpy).toHaveBeenCalledWith(['/error/404']);
      },
    });

    const req = httpMock.expectOne('/test');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });

  it('should navigate to /error/500 on 500 error', () => {
    const navigateSpy = spyOn(router, 'navigate');
    httpClient.get('/test').subscribe({
      error: () => {
        expect(navigateSpy).toHaveBeenCalledWith(['/error/500']);
      },
    });

    const req = httpMock.expectOne('/test');
    req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should navigate to /error/502 on 502 error', () => {
    const navigateSpy = spyOn(router, 'navigate');
    httpClient.get('/test').subscribe({
      error: () => {
        expect(navigateSpy).toHaveBeenCalledWith(['/error/502']);
      },
    });

    const req = httpMock.expectOne('/test');
    req.flush('Bad Gateway', { status: 502, statusText: 'Bad Gateway' });
  });

  it('should navigate to /error/503 on 503 error', () => {
    const navigateSpy = spyOn(router, 'navigate');
    httpClient.get('/test').subscribe({
      error: () => {
        expect(navigateSpy).toHaveBeenCalledWith(['/error/503']);
      },
    });

    const req = httpMock.expectOne('/test');
    req.flush('Service Unavailable', { status: 503, statusText: 'Service Unavailable' });
  });

  it('should navigate to /error/504 on 504 error', () => {
    const navigateSpy = spyOn(router, 'navigate');
    httpClient.get('/test').subscribe({
      error: () => {
        expect(navigateSpy).toHaveBeenCalledWith(['/error/504']);
      },
    });

    const req = httpMock.expectOne('/test');
    req.flush('Gateway Timeout', { status: 504, statusText: 'Gateway Timeout' });
  });

  it('should re-throw the error after handling it', () => {
    httpClient.get('/test').subscribe({
      next: () => fail('should have failed with a 500 error'),
      error: (error: HttpErrorResponse) => {
        expect(error).toBeTruthy();
        expect(error.status).toBe(500);
      },
    });

    const req = httpMock.expectOne('/test');
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });
  });
});
