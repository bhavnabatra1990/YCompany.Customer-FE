import { Component } from '@angular/core';
import { OktaUser } from '../models/oktaUser.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SignUpData } from '../models/signUpData.model';

@Component({
  selector: 'app-oktaregister',
  standalone: false,
  templateUrl: './oktaregister.component.html',
  styleUrl: './oktaregister.component.css'
})
export class OktaregisterComponent {
  register = {
    firstName: '',
    lastName: '',
    email: '',
    userType: 'Customer'
  } as OktaUser;
  isLoading = false;
  errorMessage: string | null = null;
  policyNumber: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }


  ngOnInit(): void {
    const emailParam = this.route.snapshot.paramMap.get('email');
    if (emailParam) {
      this.register.email = emailParam;
    }
    const policyParam = this.route.snapshot.paramMap.get('policy');
    if (policyParam) {
      this.policyNumber = policyParam;
    }
  }

  registerUser() {
    // Reset state
    this.isLoading = true;
    this.errorMessage = '';

    if(this.register.userType !== 'Customer') {
      this.errorMessage = 'For now, only customer user type is supported.';
      this.isLoading = false;
      return;
    }

    const signUpData = {
      email: this.register.email,
      policyNumber: this.policyNumber,
      firstName: this.register.firstName,
      lastName: this.register.lastName,
      userType: this.register.userType
    } as SignUpData;

    this.userService.signUpCustomer(signUpData).subscribe({
      next: () => {
        this.resetForm();
        alert('User registered successfully in Okta. Please Login again!');
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = `Failed to register user: ${error.error.errorSummary || error.message}`;
        this.isLoading = false;
      }
    });
  }

  resetForm() {
    this.register = {
      firstName: '',
      lastName: '',
      email: '',
      userType: 'Customer'
    } as OktaUser;
  }
}
