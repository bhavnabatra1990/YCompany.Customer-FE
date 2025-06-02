import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { PolicyService } from '../services/policy.service';
import { AddressService } from '../services/address.service';
import { Address } from '../models/address.model';
import { DataService } from '../services/data.service';

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
  isLoading = true;
  error: string | null = null;
  addressId: number | undefined;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  policyId: number | undefined;

  constructor(private route: ActivatedRoute,private addressService: AddressService, 
    private dataService: DataService, public loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const policyParam = this.route.snapshot.paramMap.get('policyId');

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
  }

  loadCountries() {
    this.dataService.getCountries().subscribe((data) => {
      this.countries = data;
    });
  }

  onCountryChange() {
    this.address.stateId = undefined;
    this.address.cityId = undefined;
    this.states = [];
    this.cities = [];

    if (this.address.countryId) {
      this.dataService.getStateFromCountry(this.address.countryId).subscribe((data) => {
        this.states = data;
      });
    }
  }

  onStateChange() {
    this.address.cityId = undefined;
    this.cities = [];

    if (this.address.stateId) {
      this.dataService.getCityFromState(this.address.stateId).subscribe((data) => {
        this.cities = data;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['addressId'] && this.addressId) {
      this.fetchAddressDetail();
    }
  }

  fetchAddressDetail(): void {
    if(this.addressId) {
    this.addressService.getAddressDetail(this.addressId).subscribe({
      next: (response) => {
        if (response.success) {
          this.address = response.response;
          this.loadStatesAndCities();
        } else {
          this.error = response.statusMessage;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Address fetch error:', err);
        this.error = 'An error occurred while loading address details.';
        this.isLoading = false;
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
  this.router.navigate(['/policy', this.policyId]);

  // Alternative: Use history to go back
  // window.history.back();
}

updateAddress(){
  if (this.address && this.address) {
    this.isLoading = true;
    this.addressService.updateAddress(this.address).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Address updated successfully');
          this.fetchAddressDetail(); // Refresh the details after update
        } else {
          this.error = response.statusMessage;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Address update error:', err);
        this.error = 'An error occurred while updating the address.';
        this.isLoading = false;
      }
    });
  } else {
    alert('No address details available to update.');
  }
}
}