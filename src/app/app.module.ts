import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent,
    LandingComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
