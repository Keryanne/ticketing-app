import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-explore-details',
  templateUrl: 'explore-details.page.html',
  styleUrls: ['explore-details.page.scss']
})
export class ExploreDetailsPage implements OnInit {
  event: any;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private eventService: EventService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const id = +idParam;
      this.eventService.getEventById(id).subscribe(
        (data) => {
          this.event = data;
        },
        (error) => {
          console.error('Error fetching event', error);
        }
      );
    } else {
      console.error('Invalid event ID');
    }
  }

  async buyTicket() {
    if (this.event && this.event.id) {
      this.eventService.buyTicket(this.event.id).subscribe(
        async (data) => {
          const alert = await this.alertController.create({
            header: 'Success',
            message: 'Ticket purchased successfully!',
            buttons: ['OK']
          });
          await alert.present();
        },
        async (error) => {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Error purchasing ticket. Please try again.',
            buttons: ['OK']
          });
          await alert.present();
          console.error('Error purchasing ticket', error);
        }
      );
    }
  }
}
