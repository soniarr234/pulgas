import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Inicio } from './pages/inicio/inicio';
import { Programa } from './pages/programa/programa';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },

  {
    path: 'inicio',
    component: Inicio,
  },

  {
    path: 'programa',
    component: Programa,
  },

  {
    path: '**',
    redirectTo: '',
  },
];
