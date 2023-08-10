

export interface IFarm {
  farmImageUrl: string | undefined;
  owner: string;
  displayName: string;
  name: string;
  phone: string;
  openHour: string;
  closeHour: string;
  id: string;
  farmAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    geoLocation: {
      lat: number;
      lng: number;
    }
  };
}



type GoogleApiGeocodingAddressComponent = {
  long_name: string
  short_name: string
  types: string[]
}
export type GoogleApiGeocodingResult = {
  address_components: GoogleApiGeocodingAddressComponent[]
  formatted_address: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
}
export type GoogleApiGeocodingResponse = {
  results: GoogleApiGeocodingResult[]
  status: string
  error_message?: string
}
