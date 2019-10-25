import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SheltersModule } from './shelters/shelters.module';
import { NavbarComponent } from './navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { RegistrationShelterModule } from './registration-shelter/registration-shelter.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    SheltersModule,
    MatButtonModule,
    RegistrationShelterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}