import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from '../services/event.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.page.html',
  styleUrls: ['./add-location.page.scss'],
})
export class AddLocationPage {
  location: any = {};
  selectedFile: File | null = null;

  constructor(private locationService: LocationService, private router: Router) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addLocation() {
    const formData = new FormData();
    formData.append('name', this.location.name);
    formData.append('description', this.location.description);
    formData.append('availableFrom', this.location.availableFrom);
    formData.append('availableTo', this.location.availableTo);
    formData.append('maxGuests', this.location.maxGuests);
    formData.append('includesTransport', this.location.includesTransport);
    formData.append('price', this.location.price);
    formData.append('city', this.location.city);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.locationService.addLocation(formData).subscribe(
      () => {
        console.log('Location added successfully');
        this.router.navigate(['/tabs/profile']);
      },
      (error) => {
        console.error('Error adding location', error);
      }
    );
  }
}
