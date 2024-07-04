import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, AlertController  } from '@ionic/angular';
// import { StripeService } from '../services/stripe.service';
import { PaymentComponent } from '../payment/payment.component';
import { ReservationService } from '../services/reservation.service';
import { FlightService } from '../services/flight.service';
import { LocationService } from '../services/event.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
  isLoggedIn: boolean = false;

  adults: number = 0;

  tempAdults: number = 0;

  property: any;

  userId: number | null = null; // Initialisez userId
  eventId: number | null = null;

  totalPriceWithFlight: number = 0;

  constructor(private authService: AuthService,
    private router: Router,
    private modalController: ModalController,
    // private stripeService: StripeService,
    private alertController: AlertController,
    private reservationService: ReservationService,
    private flightService: FlightService,
    private locationService: LocationService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      const tokenUserId = this.authService.getUserIdFromToken();
      if (tokenUserId) {
        this.authService.getUserById(tokenUserId).subscribe(
          (user) => {
            this.userId = user.id;
            console.log('User ID:', this.userId); // Debugging line
          },
          (error) => {
            console.error('Error fetching user ID', error);
          }
        );
      }
    }

    const idParam = this.route.snapshot.paramMap.get('propertyId');
    if (idParam !== null) {
     this.eventId = +idParam;
      this.locationService.getLocationById(this.eventId ).subscribe(
        (data) => {
          this.property = data;
          if (this.property.id) {
            this.getFlights(this.property.id);
          }
        },
        (error) => {
          console.error('Error fetching location', error);
          // Gérer le cas où l'ID est invalide ou la location n'est pas trouvée
        }
      );
    } else {
      console.error('ID de propriété non valide');
      // Vous pouvez rediriger l'utilisateur ou afficher un message d'erreur
    }
  }

  incrementTemp(type: string) {
    if (type === 'adults') {
      this.tempAdults++;
    }
  
  }

  decrementTemp(type: string) {
    if (type === 'adults' && this.tempAdults > 0) {
      this.tempAdults--;
    }
  }

  saveTravelers() {
    this.adults = this.tempAdults;
    this.modalController.dismiss();
  }

  cancelTravelers() {
    this.modalController.dismiss();
  }

  openTravelersModal() {
    this.tempAdults = this.adults;
  }

  cancelDates() {
    this.modalController.dismiss();
  }

  async confirmAndPay() {
    const totalPrice = this.calculateTotalPrice();
    const amount = totalPrice * 100; // Convert to cents

    const modal = await this.modalController.create({
      component: PaymentComponent,
      componentProps: { amount }
    });

    modal.onDidDismiss().then(async (data) => {
      if (data.data && data.data.success) {
        await this.saveReservation(totalPrice);
        const alert = await this.alertController.create({
          header: 'Success',
          message: 'Payment successful and reservation saved!',
          buttons: ['OK']
        });
        await alert.present();
      } else {
        const alert = await this.alertController.create({
          header: 'Payment Failed',
          message: 'Please try again.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });

    await modal.present();
  }

  openFlightsModal() {
    // this.tempSelectedFlights = this.selectedFlights;
  }

   async saveReservation(totalPrice: number) {
    const reservation = {
      totalPrice: totalPrice,
      userId: this.userId,
    };
    console.log(reservation);

    this.reservationService.createReservation(reservation).subscribe(
      (response) => {
        console.log('Reservation created successfully', response);
      },
      (error) => {
        console.error('Error creating reservation', error);
      }
    );
  }


  navigateToLogin() {
    this.router.navigate(['/tabs/login']);
  }

  navigateToSignup() {
    this.router.navigate(['/tabs/signup']);
  }
}
