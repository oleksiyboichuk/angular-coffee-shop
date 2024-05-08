import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ErrorComponent } from './shared/component/error/error.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },

  {
    path: 'products',
    loadComponent: () => import('./components/products/products.component')
      .then(c => c.ProductsComponent),
  },

  {
    path: 'products/detail/:id',
    loadComponent: () => import('./components/products/components/product/product.component')
      .then(c => c.ProductComponent),
  },

  {
    path: 'products/liked',
    loadComponent: () => import('./components/products/components/liked/liked.component')
      .then(c => c.LikedComponent),
  },

  {
    path: 'order',
    loadComponent: () => import('./components/products/pages/order/order.component')
      .then(c => c.OrderComponent)
  },

  {
    path: '**',
    component: ErrorComponent,

  },
];
