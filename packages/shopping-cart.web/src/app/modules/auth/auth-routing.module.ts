import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutComponent } from './auth-layout.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [{
  path: '', component: AuthLayoutComponent,
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: LandingPageComponent }
    // { path: 'login', component: LoginComponent },
  ]
}];

export const AuthRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
