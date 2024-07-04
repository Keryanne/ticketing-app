import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-explore',
  templateUrl: 'explore.page.html',
  styleUrls: ['explore.page.scss']
})
export class ExplorePage implements OnInit {
  events: any[] = [];

  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getAllEvents().subscribe(
      (data) => {
        this.events = data;
      },
      (error) => {
        console.error('Error fetching events', error);
      }
    );
  }

  openDetails(id: number) {
    this.router.navigate(['/tabs/explore-details', id]);
  }

  goToCreateEvent() {
    this.router.navigate(['/tabs/create-event']);
  }
}
