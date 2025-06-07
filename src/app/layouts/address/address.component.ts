import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { PolicyService } from '../../services/policy.service';
import { AddressService } from '../../services/address.service';
import { Address } from '../../models/address.model';
import { DataService } from '../../services/data.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-address',
  standalone: false,
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent implements OnChanges, OnInit {
  address: Address = {
    countryId: undefined,
    stateId: undefined,
    cityId: undefined,
    streetAddress: '',
    landMark: '',
    postalCode: '',
    id: 0
  };
  error: string | null = null;
  addressId: number | undefined;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  policyId: number | undefined;
  isChange: boolean = false;
  originalAddress: Address = {
    countryId: undefined,
    stateId: undefined,
    cityId: undefined,
    streetAddress: '',
    landMark: '',
    postalCode: '',
    id: 0
  };

  constructor(private route: ActivatedRoute,private addressService: AddressService, 
    private dataService: DataService, public loginService: LoginService, private router: Router,
     private cdr: ChangeDetectorRef, private loadingService: LoadingService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const policyParam = this.route.snapshot.paramMap.get('policyId');
    this.isChange = false;
    this.cdr.detectChanges();
    this.loadingService.show();
    if (idParam) {
    this.addressId = parseInt(idParam,10);
    }
    if (policyParam) {
      this.policyId = parseInt(policyParam,10);
      }

    if (this.addressId) {
      this.loadCountries();
      this.fetchAddressDetail();
    }
    this.loadingService.hide();
  }

  loadCountries() {
    this.dataService.getCountries().subscribe((data) => {
      this.countries = data;
    });
  }

  onCountryChange() {
    this.loadingService.show();
    this.address.stateId = undefined;
    this.address.cityId = undefined;
    this.states = [];
    this.cities = [];
    this.detectChanges();

    if (this.address.countryId) {
      this.dataService.getStateFromCountry(this.address.countryId).subscribe((data) => {
        this.states = data;
      });
    }
    this.loadingService.hide();
  }

  onStateChange() {
    this.loadingService.show();
    this.address.cityId = undefined;
    this.cities = [];
    this.detectChanges();

    if (this.address.stateId) {
      this.dataService.getCityFromState(this.address.stateId).subscribe((data) => {
        this.cities = data;
      });
    }
    this.loadingService.hide();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['addressId'] && this.addressId) {
      this.fetchAddressDetail();
    }
  }

  detectChanges() {
    this.isChange = JSON.stringify(this.address) !== JSON.stringify(this.originalAddress);
    this.cdr.detectChanges(); // Force Angular to update the view
  }

  fetchAddressDetail(): void {
    if(this.addressId) {
    this.addressService.getAddressDetail(this.addressId).subscribe({
      next: (response) => {
        if (response.success) {
          this.originalAddress = response.response;
          this.address = { ...this.originalAddress };
          this.isChange = false;
          this.loadStatesAndCities();
        } else {
          this.error = response.statusMessage;
        }
      },
      error: (err) => {
        console.error('Address fetch error:', err);
        this.error = 'An error occurred while loading address details.';
      }
    });
  }
}

loadStatesAndCities() {
  if (this.address.countryId) {
    this.dataService.getStateFromCountry(this.address.countryId).subscribe((states) => {
      this.states = states;

      if (this.address.stateId) {
        this.dataService.getCityFromState(this.address.stateId).subscribe((cities) => {
          this.cities = cities;
        });
      }
    });
  }
}

goToPreviousPolicy() {
  const id = this.policyId;
  this.router.navigate(['/policy', id]);
}

updateAddress(){
  if (this.isChange && this.address) {
    this.loadingService.show();
    this.addressService.updateAddress(this.address).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Address updated successfully');
          this.fetchAddressDetail(); // Refresh the details after update
        } else {
          this.error = response.statusMessage;
        }
        this.loadingService.hide();
      },
      error: (err) => {
        console.error('Address update error:', err);
        this.error = 'An error occurred while updating the address.';
        this.loadingService.hide();
      }
    });
  } else {
    alert('No address details available to update.');
  }
}
}