import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NonAuthLayoutComponent } from './non-auth-layout.component';
import { LandingPageComponent, LoginComponent, RegisterComponent } from './components';

const routes: Routes = [
  {
    path: '', component: NonAuthLayoutComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: RegisterComponent },
    ]
  }
];

export const NonAuthRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
