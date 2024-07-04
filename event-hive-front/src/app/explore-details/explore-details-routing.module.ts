import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreDetailsPage } from './explore-details.page';

const routes: Routes = [
  {
    path: '',
    component: ExploreDetailsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExploreDetailsPageRoutingModule {}
