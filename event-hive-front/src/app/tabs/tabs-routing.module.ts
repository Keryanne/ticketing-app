import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'explore',
        loadChildren: () => import('../explore/explore.module').then(m => m.ExplorePageModule)
      },
      {
        path: 'explore-details/:id',
        loadChildren: () => import('../explore-details/explore-details.module').then(m => m.ExploreDetailsPageModule)
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'reservation/:propertyId',
        loadChildren: () => import('../reservation/reservation.module').then(m => m.ReservationPageModule)
      },
      {
        path: 'reservations',
        loadChildren: () => import('../reservations/reservations.module').then(m => m.ReservationsPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('../signup/signup.module').then( m => m.SignupPageModule)
      },
      {
        path: 'add-location',
        loadChildren: () => import('../add-location/add-location.module').then( m => m.AddLocationPageModule)
      },
      {
        path: 'my-locations',
        loadChildren: () => import('../my-locations/my-locations.module').then( m => m.MyLocationsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/explore',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
