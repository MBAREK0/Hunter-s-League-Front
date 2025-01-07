import { HttpInterceptorFn, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {inject} from "@angular/core";

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // Inject AuthService

  const token = localStorage.getItem('authToken');
  let clonedRequest = req; // Initialize the request

  if (token) {
    clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.error('Unauthorized request:', error.message);

        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          return throwError(() => error);
        }

        // Send the refresh token to the backend to get a new access token
        return authService.refreshAccessToken(refreshToken).pipe(
          switchMap((tokens: any) => {
            // Update the tokens in localStorage
            localStorage.setItem('authToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);

            // Retry the original request with the new access token
            const retryRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${tokens.refreshToken}`
              }
            });

            return next(retryRequest);
          }),
          catchError((refreshError) => {
            // Handle error if refresh token request fails (e.g., logout the user)
            console.error('Refresh token failed', refreshError);
            return throwError(() => refreshError);
          })
        );
      }
      // Pass other errors along
      return throwError(() => error);
    })
  );
};
