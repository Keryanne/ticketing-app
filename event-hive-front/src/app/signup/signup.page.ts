import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  username: string = "";
  email: string = "";
  password: string = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async register() {
    this.authService.register(this.username, this.email, this.password).subscribe(
      async (response) => {
        const alert = await this.alertController.create({
          header: 'Success',
          message: 'Registration successful!',
          buttons: ['OK']
        });
        await alert.present();
        this.router.navigate(['/tabs/login']);
      },
      async (error) => {
        const alert = await this.alertController.create({
          header: 'L\'inscription a échoué',
          message: error.message || 'An error occurred during registration. Please try again.',
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }
}
