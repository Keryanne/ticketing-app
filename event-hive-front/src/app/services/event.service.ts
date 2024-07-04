import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://localhost:5093/api/locations'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) {}

  getAllLocations(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getLocationById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addLocation(location: FormData): Observable<any> {
    return this.http.post(this.apiUrl, location);
  }

  deleteLocation(locationId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${locationId}`);
  }

  updateLocation(locationId: number, location: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${locationId}`, location);
  }

  searchLocations(params: any): Observable<any> {
    let httpParams = new HttpParams();
    if (params.searchTerm) {
      httpParams = httpParams.append('searchTerm', params.searchTerm);
    }
    if (params.availableFrom) {
      httpParams = httpParams.append('availableFrom', params.availableFrom);
    }
    if (params.availableTo) {
      httpParams = httpParams.append('availableTo', params.availableTo);
    }
    if (params.maxPrice) {
      httpParams = httpParams.append('maxPrice', params.maxPrice);
    }
    if (params.maxGuests) {
      httpParams = httpParams.append('maxGuests', params.maxGuests);
    }

    return this.http.get(`${this.apiUrl}/search`, { params: httpParams });
  }
}
