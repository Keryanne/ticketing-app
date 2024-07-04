import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LocationService } from '../services/event.service';

@Component({
  selector: 'app-explore',
  templateUrl: 'explore.page.html',
  styleUrls: ['explore.page.scss']
})
export class ExplorePage implements OnInit {
  isModalOpen = false;
  adults: number = 2;
  children: number = 0;
  babies: number = 0;

  properties: any[] = [];

  ngOnInit() {
    this.locationService.getAllLocations().subscribe(
      (data) => {
        this.properties = data;
      },
      (error) => {
        console.error('Error fetching locations', error);
      }
    );
  }

  openDetails(id: number) {
    this.router.navigate(['/tabs/explore-details', id]);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  increment(type: string) {
    if (type === 'adults') {
      this.adults++;
    } else if (type === 'children') {
      this.children++;
    } else if (type === 'babies') {
      this.babies++;
    }
  }

  decrement(type: string) {
    if (type === 'adults' && this.adults > 0) {
      this.adults--;
    } else if (type === 'children' && this.children > 0) {
      this.children--;
    } else if (type === 'babies' && this.babies > 0) {
      this.babies--;
    }
  }

  constructor(private router: Router, private modalController: ModalController, private locationService: LocationService) {}

}
