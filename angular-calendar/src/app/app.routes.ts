import { Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';

export const routes: Routes = [
  { path: '', component: CalendarComponent },
  { path: 'calendar', component: CalendarComponent },
  { 
    path: 'error/404', 
    loadComponent: () => import('./error-pages/error-404/error-404.component').then(m => m.Error404Component)
  },
  { 
    path: 'error/500', 
    loadComponent: () => import('./error-pages/error-500/error-500.component').then(m => m.Error500Component)
  },
  { 
    path: 'error/502', 
    loadComponent: () => import('./error-pages/error-502/error-502.component').then(m => m.Error502Component)
  },
  { 
    path: 'error/503', 
    loadComponent: () => import('./error-pages/error-503/error-503.component').then(m => m.Error503Component)
  },
  { 
    path: 'error/504', 
    loadComponent: () => import('./error-pages/error-504/error-504.component').then(m => m.Error504Component)
  },
  { path: '**', redirectTo: '/error/404' }
];
