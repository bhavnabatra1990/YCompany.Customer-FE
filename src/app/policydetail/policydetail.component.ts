import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PolicyService } from '../services/policy.service';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-policydetail',
  standalone: false,
  templateUrl: './policydetail.component.html',
  styleUrl: './policydetail.component.css'
})
export class PolicydetailComponent implements OnChanges, OnInit {
  policyDetail: any = null;
  isLoading = true;
  error: string | null = null;
  policyId: number | undefined;

  constructor(private route: ActivatedRoute,private policyService: PolicyService, public loginService: LoginService,
    private router:Router) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
    this.policyId = parseInt(idParam,10);
    }
    if (this.policyId) {
      this.fetchPolicyDetail();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['policyId'] && this.policyId) {
      this.fetchPolicyDetail();
    }
  }

  fetchPolicyDetail(): void {
    //const policyId = 1222337; // Replace with dynamic ID if needed
    const userId = this.loginService.geUserId();
    if(userId && this.policyId) {
    this.policyService.getPolicyDetail(this.policyId,userId).subscribe({
      next: (response) => {
        if (response.success) {
          this.policyDetail = response.response;
        } else {
          this.error = response.statusMessage;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Policy fetch error:', err);
        this.error = 'An error occurred while loading policy details.';
        this.isLoading = false;
      }
    });
  }
}

navigateToAddress(id: number) {
  this.router.navigate(['/address', id, this.policyId]);
}

}
