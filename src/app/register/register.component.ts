import { Component } from '@angular/core';
import { SignUpData } from '../models/signUpData.model';
import { UserService } from '../services/user.service';
import { Status } from '../enums/status';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent { register = {
  email: '',
  policyNumber: ''
} as SignUpData;
isLoading = true;
error: string | null = null;

constructor(private userService: UserService, private router:Router) {}

onSubmit() {
  if (this.register.email && this.register.policyNumber) {
    this.isLoading = true;
    this.userService.getSignUp(this.register.policyNumber,this.register.email).subscribe({
      next: (apiReponse) => {
        if (apiReponse.success) {
          //check if the response has Status value as IsRegistered
          if (apiReponse.response === Status.IsRegistered) {
             this.router.navigate(['/login']);
          } else if (apiReponse.response === Status.NotAvailable) {
            this.isLoading = false;
            alert('Policy number is not available or user is not available.');
          }
          else if (apiReponse.response === Status.IsNewUser) {
            this.router.navigate(['/oktaregister', this.register.email, this.register.policyNumber]);
          }
        } else {
          this.error = apiReponse.statusMessage;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Register error:', err);
        this.error = 'An error occurred while register.';
        this.isLoading = false;
      }
    });
  } else {
    alert('Please fill in all required fields.');
  }
}
}
