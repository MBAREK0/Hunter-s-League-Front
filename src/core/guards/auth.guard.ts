import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const jwtService = inject(JwtService);

  // Get token from storage
  const token = localStorage.getItem('authToken');
  console.log("im in guard",token);
  if (!token) {
    router.navigate(['/auth/login']).then(r => console.log(r));
    return false;
  }

  // Decode token
  const decodedToken = jwtService.getDecodedAccessToken(token);
  const requiredRole = route.data['role'];
  const requiredPermissions: string[] = route.data['permissions'] || [];

  // Extract role and permissions from token
  const userRole = decodedToken?.role;
  const userPermissions = decodedToken?.permissions.map((perm: any) => perm.authority) || [];

  if (!userRole || !userPermissions) {
    router.navigate(['/login']);
    return false;
  }

  // Check role
  if (requiredRole && userRole !== requiredRole) {
    router.navigate(['/unauthorized']);
    return false;
  }

  // Check permissions
  const hasAllPermissions = requiredPermissions.every(permission =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
