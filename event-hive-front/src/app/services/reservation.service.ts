import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:5093/api/reservations'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) {}

  getAllReservations(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getReservationById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createReservation(reservation: any): Observable<any> {
    return this.http.post(this.apiUrl, reservation);
  }

  updateReservation(id: number, reservation: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, reservation);
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
