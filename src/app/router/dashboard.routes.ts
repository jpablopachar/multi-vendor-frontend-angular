import { Routes } from '@angular/router'
import { RoutesEnum } from '@app/routes.enum'

const COMPONENTS = {
  DashboardComponent: () =>
    import('../pages/dashboard.component').then((m) => m.DashboardComponent),
  OrdersComponent: () =>
    import('../components/dashboard/orders.component').then(
      (m) => m.OrdersComponent
    ),
  ChangePasswordComponent: () =>
    import('../components/dashboard/change-password.component').then(
      (m) => m.ChangePasswordComponent
    ),
  WhishlistComponent: () =>
    import('../components/dashboard/whishlist.component').then(
      (m) => m.WhishlistComponent
    ),
  OrderDetailsComponent: () =>
    import('../components/dashboard/order-details.component').then(
      (m) => m.OrderDetailsComponent
    ),
  ChatComponent: () =>
    import('../components/dashboard/chat.component').then(
      (m) => m.ChatComponent
    ),
};

export const DashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: COMPONENTS.DashboardComponent,
    children: [
      {
        path: RoutesEnum.MY_ORDERS,
        loadComponent: COMPONENTS.OrdersComponent,
      },
      {
        path: RoutesEnum.CHANGE_PASSWORD,
        loadComponent: COMPONENTS.ChangePasswordComponent,
      },
      {
        path: RoutesEnum.MY_WHISHLIST,
        loadComponent: COMPONENTS.WhishlistComponent,
      },
      {
        path: `${RoutesEnum.ORDER}/${RoutesEnum.DETAILS}/:orderId`,
        loadComponent: COMPONENTS.OrderDetailsComponent,
      },
      {
        path: RoutesEnum.CHAT,
        loadComponent: COMPONENTS.ChatComponent,
      },
      {
        path: `${RoutesEnum.CHAT}/:sellerId`,
        loadComponent: COMPONENTS.ChatComponent,
      },
    ],
  },
];
