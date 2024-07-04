import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { AddLocationPage } from './add-location.page';
import { AddLocationPageRoutingModule } from './add-location-routing.module';


@NgModule({
  imports: [
    CommonModule,
    AddLocationPageRoutingModule,
    FormsModule,
    IonicModule,
  ],

  declarations: [AddLocationPage]
})
export class AddLocationPageModule { }
