export interface Address {
    id: number;
    countryId?: number;
    stateId?: number;
    cityId?: number;
    postalCode: string;
    countryName?: string;
    stateName?: string;
    cityName?: string;
    streetAddress?: string;
    landMark?: string;  
  }