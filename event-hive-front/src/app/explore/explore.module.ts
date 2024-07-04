import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExplorePage } from './explore.page';

import { ExplorePageRoutingModule } from './explore-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExplorePageRoutingModule
  ],
  declarations: [ExplorePage]
})
export class ExplorePageModule {}
