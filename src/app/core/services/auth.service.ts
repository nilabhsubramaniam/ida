import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  
  // In a real app, this would be stored securely
  private tokenKey = 'auth_token';

  constructor(private router: Router) {
    // Check login status on service initialization
    this.checkLoginStatus();
    
    // Subscribe to authentication state changes
    this.isLoggedIn$.subscribe(state => {
      // Authentication state changed
    });
  }

  private hasToken(): boolean {
    // In a real app, you would validate token expiration too
    const hasToken = !!localStorage.getItem(this.tokenKey);
    return hasToken;
  }

  checkLoginStatus(): void {
    // Update the logged-in status based on token presence
    const isLoggedIn = this.hasToken();
    this.isLoggedInSubject.next(isLoggedIn);
  }

  login(credentials: { email: string, password: string }): Promise<boolean> {
    // Mock login - in a real app, this would call an API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock successful login
        localStorage.setItem(this.tokenKey, 'mock-jwt-token');
        this.isLoggedInSubject.next(true);
        resolve(true);
      }, 800);
    });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInSubject.next(false);
    // Redirect to home page/landing page after logout
    this.router.navigate(['/'], { queryParams: { loggedOut: true } });
  }

  // For demo purposes - simulates a user being logged in
  simulateLogin(): void {
    localStorage.setItem(this.tokenKey, 'mock-jwt-token');
    this.isLoggedInSubject.next(true);
  }
  
  // Public method to check if user is authenticated
  isAuthenticated(): boolean {
    return this.hasToken();
  }
}
