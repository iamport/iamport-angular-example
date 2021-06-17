import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {PaymentComponent} from './payment/payment.component';
import {CertificationComponent} from './certification/certification.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {PaymentResultComponent} from './payment-result/payment-result.component';
import {CertificationResultComponent} from './certification-result/certification-result.component';


@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
    CertificationComponent,
    HomeComponent,
    PaymentResultComponent,
    CertificationResultComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: 'payment', component: PaymentComponent},
      {path: 'payment/result', component: PaymentResultComponent},
      {path: 'certification', component: CertificationComponent},
      {path: 'certification/result', component: CertificationResultComponent},
      {path: '', redirectTo: '/home', pathMatch: 'full'},
    ]),
    BrowserAnimationsModule,
    FormsModule,

    // material modules
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [RouterModule],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
