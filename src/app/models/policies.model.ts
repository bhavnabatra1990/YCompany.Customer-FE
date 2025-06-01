export interface Policy {
    id: number;
    policyName: string;
    policyNumber: string;
    policyStartDate: string;
    policyEndDate: string;
    policyHolder: string;
    sumAssured:number;
    premiumPaid: number;
    billingCycle: string;
    addressId: number;
  }