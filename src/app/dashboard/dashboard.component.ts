import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { PolicyService } from '../services/policy.service';
import { Policy } from '../models/policies.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private authSubscription!: Subscription;

  activeTab: string = 'policies';
  policies: Policy[] = [];
  userProfile: any = null;
  isAuthenticated = false;
  isLoading: boolean = false;
  error:string | null = null;

  constructor(
    public loginService: LoginService,
    public userService: UserService,
    public policyService: PolicyService,
    private cdr: ChangeDetectorRef,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.authSubscription = this.loginService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
      if (isAuth) {
        this.fetchUserProfile();
      } else {
        this.userProfile = undefined;
        this.policies = [];
      }
    });
  }

  fetchUserProfile(): void {
    this.isLoading = true;
    const claims = this.loginService.getuserClaims();
    //get email from claims
    if (!claims || !claims.preferred_username) {
      this.isLoading = false;
      alert('No email found in user claims');
      return;
    }
    const email = claims.preferred_username;
    const name = claims.name;
    this.userService.fetchUserProfile(email).subscribe({
      next: (response) => {
        if (response.success) {
          this.userProfile = response.response;
          this.loginService.setUserId(this.userProfile.id,name); // Set user ID in login service
          this.fetchPolicies(); // Fetch policies after setting user ID
          this.isLoading = false;
          this.cdr.detectChanges(); // Move here so it happens after setting policies
        } else {
          this.error = response.statusMessage;
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.error = 'Error fetching policies';
        console.error('Error fetching policies:', error);
      }
    });
  }

  fetchPolicies(): void {
    this.isLoading = true;
    const userId = this.loginService.geUserId();
    if (userId) {
      this.policyService.getAllPolicies(userId).subscribe({
        next: (response) => {
          if (response.success) {
            this.policies = response.response;
            this.isLoading = false;
            this.cdr.detectChanges(); // Move here so it happens after setting policies
          } else {
            this.error = response.statusMessage;
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.error = 'An error occurred while fetching policies';
        }
      });
    }
  }

  viewPolicyDetails(params: any) {
    const policyId = params.id;
    this.router.navigate(['/policy', policyId]);
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
