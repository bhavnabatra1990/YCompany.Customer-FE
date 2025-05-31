import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular'; // Ensure this is the correct module path

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private oktaStateService = inject(OktaAuthStateService);
  private oktaAuth = inject(OKTA_AUTH);

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(Promise.resolve(this.oktaAuth.getAccessToken())).pipe(
      switchMap(token => {
        if (token) {
          console.log('Adding Authorization header with token:', token);
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(authReq);
        } else {
          return next.handle(req);
        }
      })
    );
  }
}
