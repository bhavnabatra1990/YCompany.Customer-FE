import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { ChangeDetectorRef } from '@angular/core';
import { UserProfile } from '../models/user-profile.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy{
  authSubscription: any;
  constructor(public loginService: LoginService,
     public userService: UserService,
     private cdr: ChangeDetectorRef) {}
  activeTab: string = 'policies'; // Initialize activeTab with a default value
  policies: { name: string }[] = []; // Example structure for policies
  userProfile: any = null; // Example structure for user profile
  isAuthenticated = false;

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.authSubscription = this.loginService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
      if (isAuth) {
        this.fetchUserProfile();
        // Replace static policies with API call if needed
        this.policies = [
          { name: 'Policy 1' },
          { name: 'Policy 2' },
          { name: 'Policy 3' }
        ];
      } else {
        this.userProfile = undefined; // Clear profile data on logout
      }
    });
  }

  fetchUserProfile(): void {
    var claims = this.loginService.getuserClaims();
    //get email from claims
    if (!claims || !claims.preferred_username) {
      console.error('No email found in user claims');
      return;
    }
    const email = claims.preferred_username;  // Replace with actual logged-in user ID or token logic
    this.userService.getProfile(email).subscribe({
      next: responseData=> {
        if(responseData && responseData.response && responseData.success) {
        this.userProfile = responseData.response as UserProfile;
        this.cdr.detectChanges(); // 🔥 Manually trigger UI update
      }},
      error: err => {
        console.error('Failed to load profile:', err);
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }


}
