import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = "";
  password: string = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) { }

  async login() {
    this.authService.login(this.email, this.password).subscribe(
      async (response) => {
        // Sauvegarder le token ou gérer la session ici
        localStorage.setItem('token', response.token);
        this.router.navigate(['/tabs/explore']);
      },
      async (error) => {
        const alert = await this.alertController.create({
          header: 'Connection échoué',
          message: 'Email ou mot de passe invalide',
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }

}
