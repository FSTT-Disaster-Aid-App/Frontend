import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface Response {
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | Observable<boolean> {
    // Check if the user is authenticated
    return this.isAuthenticated().pipe(
      map((authenticated) => {
        if (authenticated) {
          return true;
        } else {
          // If not authenticated, redirect to the login page
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      }),
    );
  }

  private isAuthenticated(): Observable<boolean> {
    const authToken = localStorage.getItem('token');

    if (!authToken) {
      return of(false);
    }

    return this.http
      .get<Response>('http://localhost:8080/auth/validate?token=' + authToken)
      .pipe(
        map((response) => response.status === 'success'),
        catchError(() => of(true)),
      );
  }
}
