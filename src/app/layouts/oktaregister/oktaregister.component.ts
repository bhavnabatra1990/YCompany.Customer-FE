import { Component } from '@angular/core';
import { OktaUser } from '../../models/oktaUser.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SignUpData } from '../../models/signUpData.model';
import { LoadingService } from '../../services/loading.service';

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

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private loadingService: LoadingService) { }


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
    this.loadingService.show(); // Show loading spinner
    //this.isLoading = true;
    this.errorMessage = '';

    if(this.register.userType !== 'Customer') {
      this.errorMessage = 'For now, only customer user type is supported.';
      this.loadingService.hide();
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
      next: (response) => {
        this.resetForm()
        if (response.success) {
          alert('User registered successfully in Okta. Please Login again!');
          this.loadingService.hide();
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = response.statusMessage;
        }
        this.loadingService.hide();
      },
      error: (err) => {
        console.error('Okta register error:', err);
        this.errorMessage = 'An error occurred while registering in Okta.';
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
