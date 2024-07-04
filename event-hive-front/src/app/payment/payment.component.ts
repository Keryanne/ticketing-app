import { Component, Input, OnInit } from '@angular/core';
// import { StripeService } from '../services/stripe.service';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @Input() amount: number = 0;

  paymentMethodId: string | null = null;

  constructor(
    // private stripeService: StripeService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async pay() {
    try {
      // const paymentIntent = await this.stripeService.createPaymentIntent(this.amount);
      // const clientSecret = paymentIntent.client_secret;

      // Simuler la collecte des détails de la carte à partir d'un élément de carte
      // this.paymentMethodId = 'your-test-payment-method-id'; // Remplacez par l'ID de méthode de paiement réel

      // const result = await this.stripeService.confirmCardPayment(clientSecret, this.paymentMethodId);
      // if (result.error) {
      //   throw new Error(result.error.message);
      // }

      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Payment successful!',
        buttons: ['OK']
      });
      await alert.present();
      this.modalController.dismiss({ success: true });

    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      const alert = await this.alertController.create({
        header: 'Payment Failed',
        message: errorMessage,
        buttons: ['OK']
      });
      await alert.present();
      this.modalController.dismiss({ success: false });
    }
  }

  cancel() {
    this.modalController.dismiss();
  }
}
