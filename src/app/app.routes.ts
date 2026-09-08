import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Inicio } from './pages/inicio/inicio';
import { Programa } from './pages/programa/programa';
import { Cotilleos } from './pages/cotilleos/cotilleos';

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
    path: 'cotilleos',
    component: Cotilleos,
  },

  {
    path: '**',
    redirectTo: '',
  },
];
