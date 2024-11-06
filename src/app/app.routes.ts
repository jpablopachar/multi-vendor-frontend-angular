import { Routes } from '@angular/router'
import { protectUserGuard } from './guards'
import { RoutesEnum } from './routes.enum'

const COMPONENTS = {
  HomeComponent: () =>
    import('./pages/home.component').then((m) => m.HomeComponent),
  LoginComponent: () =>
    import('./pages/login.component').then((m) => m.LoginComponent),
  RegisterComponent: () =>
    import('./pages/register.component').then((m) => m.RegisterComponent),
  ShopsComponent: () =>
    import('./pages/shops.component').then((m) => m.ShopsComponent),
  CardComponent: () =>
    import('./pages/card.component').then((m) => m.CardComponent),
  ShippingComponent: () =>
    import('./pages/shipping.component').then((m) => m.ShippingComponent),
  PaymentComponent: () =>
    import('./pages/payment.component').then((m) => m.PaymentComponent),
  CategoryShopComponent: () =>
    import('./pages/category-shop.component').then(
      (m) => m.CategoryShopComponent
    ),
  SearchProductComponent: () =>
    import('./pages/search-product.component').then(
      (m) => m.SearchProductComponent
    ),
  DetailsComponent: () =>
    import('./pages/details.component').then((m) => m.DetailsComponent),
  ConfirmOrderComponent: () =>
    import('./pages/confirm-order.component').then(
      (m) => m.ConfirmOrderComponent
    ),
};

export const routes: Routes = [
  {
    path: '',
    loadComponent: COMPONENTS.HomeComponent,
  },
  {
    path: RoutesEnum.LOGIN,
    loadComponent: COMPONENTS.LoginComponent,
  },
  {
    path: RoutesEnum.REGISTER,
    loadComponent: COMPONENTS.RegisterComponent,
  },
  {
    path: RoutesEnum.SHOPS,
    loadComponent: COMPONENTS.ShopsComponent,
  },
  {
    path: RoutesEnum.CARD,
    loadComponent: COMPONENTS.CardComponent,
  },
  {
    path: RoutesEnum.SHIPPING,
    loadComponent: COMPONENTS.ShippingComponent,
  },
  {
    path: RoutesEnum.PAYMENT,
    loadComponent: COMPONENTS.PaymentComponent,
  },
  {
    path: RoutesEnum.PRODUCTS,
    loadComponent: COMPONENTS.CategoryShopComponent,
  },
  {
    path: `${RoutesEnum.PRODUCTS}/${RoutesEnum.SEARCH}`,
    loadComponent: COMPONENTS.SearchProductComponent,
  },
  {
    path: `${RoutesEnum.PRODUCT}/${RoutesEnum.DETAILS}/:id`,
    loadComponent: COMPONENTS.DetailsComponent,
  },
  {
    path: `${RoutesEnum.ORDER}/${RoutesEnum.CONFIRM}`,
    loadComponent: COMPONENTS.ConfirmOrderComponent,
  },
  {
    path: RoutesEnum.DASHBOARD,
    loadChildren: () =>
      import('./router/dashboard.routes').then((r) => r.DashboardRoutes),
    canActivate: [protectUserGuard],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
