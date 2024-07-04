import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreDetailsPage } from './explore-details.page';

import { ExploreDetailsPageRoutingModule } from './explore-details-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreDetailsPageRoutingModule
  ],
  declarations: [ExploreDetailsPage]
})
export class ExploreDetailsPageModule {}
