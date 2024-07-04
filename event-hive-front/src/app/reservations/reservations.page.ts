import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {
  upcomingReservations: any[] = [];
  pastReservations: any[] = [];
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private eventService: EventService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.eventService.getUserEvents().subscribe((data) => {
        const currentDate = new Date();
        this.upcomingReservations = data.filter((event: { date: string | number | Date; }) => {
          const eventDate = new Date(event.date);
          return eventDate >= currentDate;
        });
        this.pastReservations = data.filter((event: { date: string | number | Date; }) => new Date(event.date) < currentDate);
      });
    }
  }
}
