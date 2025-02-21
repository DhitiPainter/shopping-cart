import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NonAuthRoutingModule } from './non-auth-routing.module';

import { NonAuthLayoutComponent } from './non-auth-layout.component';
import { LandingPageComponent, LoginComponent } from './components';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    NonAuthLayoutComponent,
    LandingPageComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    NonAuthRoutingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class NonAuthModule { }
