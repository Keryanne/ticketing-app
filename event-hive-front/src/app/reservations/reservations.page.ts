import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {
  upcomingReservations: any[] = [];
  pastReservations: any[] = [];
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private reservationService: ReservationService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.reservationService.getAllReservations().subscribe((data) => {
        const currentDate = new Date();
        this.upcomingReservations = data.filter((reservation: { date: string | number | Date; }) => {
          const reservationDate = new Date(reservation.date);
          return reservationDate >= currentDate;
        });
        this.pastReservations = data.filter((reservation: { date: string | number | Date; }) => new Date(reservation.date) < currentDate);
      });
    }
  }
}
