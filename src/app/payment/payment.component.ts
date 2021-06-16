import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  PGS,
  METHODS_FOR_INICIS,
  QUOTAS,
  QUOTAS_FOR_INICIS_AND_KCP,
} from './constants';
import { getMethods, getQuotas } from './utils';
import { AppComponent } from '../app.component';


@Component({
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  PgOption = PGS;
  MethodOption = [{ label: 'select', value: 'select' }];
  QuotaOption = [{ value: 0, label: 'select' }];

  isQuotaRequired = false;
  isDigitalRequired = false;
  isVbankDueRequired = false;
  isBizNumRequired = false;

  paymentForm = new FormGroup({
    pgSelect: new FormControl(PGS[0].value),
    methodSelect: new FormControl(),
    quotaSelect: new FormControl(),
    vbankDueInput: new FormControl(),
    bizNumInput: new FormControl(),
    digitalSwitch: new FormControl(false),
    escrowSwitch: new FormControl(false),
    nameInput: new FormControl("아임포트 결제 데이터 분석"),
    amountInput: new FormControl(30000),
    merchantUidInput: new FormControl('min_' + new Date().getTime()),
    buyerNameInput: new FormControl('홍길동'),
    buyerTelInput: new FormControl('01012341234'),
    buyerEmailInput: new FormControl('example@example.com'),
  });

  constructor() {}

  ngOnInit(): void {
    this.onChangePg(PGS[0].value);
  }

  onChangePg(pgVal: string): void {
    // this.MethodOption = [{label:"select", value:"select"}];
    // const method = getMethods(value);
    // method.forEach(e => {
    //   this.MethodOption.push(e);
    // });
    console.log(pgVal);
    this.MethodOption = getMethods(pgVal);
    const method = this.paymentForm.get('methodSelect');

    method?.setValue(this.MethodOption[0].value); //this.paymentForm.patchValue({ methodSelect: this.MethodOption[0].value });

    this.onChangeMethod(method?.value);
  }

  onChangeMethod(methodVal: string): void {
    const pgVal = this.paymentForm.get('pgSelect')?.value;

    this.isQuotaRequired = false;
    this.isDigitalRequired = false;
    this.isVbankDueRequired = false;
    this.isBizNumRequired = false;

    /* 사업자번호/입금기한 설정 */
    switch (methodVal) {
      case 'card': {
        this.isQuotaRequired = true;
        break;
      }
      case 'phone': {
        this.isDigitalRequired = true;
        break;
      }
      case 'vbank': {
        if (pgVal === 'danal_tpay') {
          this.isBizNumRequired = true;
        }
        this.isVbankDueRequired = true;
        break;
      }
      default:
        break;
    }
    // console.log(this.isQuotaRequired);
    // console.log(this.isDigitalRequired);
    // console.log(this.isVbankDueRequired);
    // console.log(this.isBizNumRequired);

    this.handleQuotas(pgVal, methodVal);

  }

  onSubmit(): void {
    console.log(getMethods(PGS[0].value)[0].label);
  }

  handleQuotas(pgVal: string, methodVal: string): void {
    const { isQuotaRequired, quotas } = getQuotas(pgVal, methodVal);
    this.isQuotaRequired = isQuotaRequired;
    this.QuotaOption = quotas;
    this.paymentForm.get('quotaSelect')?.setValue(this.QuotaOption[0].value);
  }
}
