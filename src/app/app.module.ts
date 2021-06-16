import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { CertificationComponent } from './certification/certification.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
    CertificationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: 'home', component: HomeComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'certification', component: CertificationComponent}
    ]),
    BrowserAnimationsModule,

    // material modules
    MatSlideToggleModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
