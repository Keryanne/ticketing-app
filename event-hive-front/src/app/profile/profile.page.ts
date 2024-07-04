import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userEmail: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Récupérer les informations de l'utilisateur
    this.userEmail = 'user@example.com'; // Remplacez par la logique réelle pour obtenir l'email de l'utilisateur connecté
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/tabs/login']);
  }

  navigateToAddLocation() {
    this.router.navigate(['/tabs/add-location']);
  }

  navigateToMyLocations() {
    this.router.navigate(['/tabs/my-locations']);
  }
}
