import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  createEventForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private eventService: EventService
  ) {
    this.createEventForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      price: ['', Validators.required],
      ticketsAvailable: ['', Validators.required]
    });
  }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/tabs/explore']);
  }

  createEvent() {
    if (this.createEventForm.valid) {
      this.eventService.createEvent(this.createEventForm.value).subscribe(
        (response) => {
          console.log('Event created successfully', response);
          this.router.navigate(['/tabs/explore']);
        },
        (error) => {
          console.error('Error creating event', error);
        }
      );
    }
  }
}
