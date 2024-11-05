import { inject } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Router,
  type CanActivateFn,
} from '@angular/router'

export const protectUserGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
): boolean | Promise<boolean> => {
  const router = inject(Router);

  const userInfo = 'abc';

  if (!userInfo) return router.navigate(['/login']);

  return true;
};
