import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpHandlerFn
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status) {
        switch (error.status) {
          case 404:
            router.navigate(['/error/404']);
            break;
          case 500:
            router.navigate(['/error/500']);
            break;
          case 502:
            router.navigate(['/error/502']);
            break;
          case 503:
            router.navigate(['/error/503']);
            break;
          case 504:
            router.navigate(['/error/504']);
            break;
          default:
            if (error.status >= 500) {
              router.navigate(['/error/500']);
            }
            break;
        }
      }
      return throwError(() => error);
    })
  );
};
