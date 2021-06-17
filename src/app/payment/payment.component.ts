import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PGS} from './constants';
import {getMethods, getQuotas} from './utils';
import {Router} from '@angular/router';
import * as queryString from 'query-string';

@Component({
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  router: Router;

  PgOption = PGS;
  MethodOption = [{label: 'select', value: 'select'}];
  QuotaOption = [{value: 0, label: 'select'}];

  isQuotaRequired = false;
  isDigitalRequired = false;
  isVbankDueRequired = false;
  isBizNumRequired = false;

  paymentForm = new FormGroup({
    pg: new FormControl(PGS[0].value),
    pay_method: new FormControl(),
    card_quota: new FormControl(),
    vbank_due: new FormControl('', [Validators.required]),
    biz_num: new FormControl(),
    digital: new FormControl(false),
    escrow: new FormControl(false),
    name: new FormControl('아임포트 결제 데이터 분석'),
    amount: new FormControl(30000),
    merchant_uid: new FormControl('min_' + new Date().getTime()),
    buyer_name: new FormControl('홍길동'),
    buyer_tel: new FormControl('01012341234'),
    buyer_email: new FormControl('example@example.com'),
  });

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit(): void {
    this.onChangePg(PGS[0].value);
  }

  onChangePg(pgVal: string): void {
    console.log(pgVal);
    this.MethodOption = getMethods(pgVal);
    const method = this.paymentForm.get('pay_method');

    method?.setValue(this.MethodOption[0].value);

    this.onChangeMethod(method?.value);
  }

  onChangeMethod(methodVal: string): void {
    const pg = this.paymentForm.get('pg')?.value;

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
        if (pg === 'danal_tpay') {
          this.isBizNumRequired = true;
        }
        this.isVbankDueRequired = true;
        break;
      }
      default:
        break;
    }
    this.handleQuotas(pg, methodVal);
  }

  onSubmit(): void {
    /* 가맹점 식별코드 */
    const userCode = 'imp19424728';
    const formValues = this.paymentForm.getRawValue();
    console.log(formValues);
    const {
      pg,
      pay_method,
      merchant_uid,
      name,
      amount,
      buyer_name,
      buyer_tel,
      buyer_email,
      escrow,
      card_quota,
      biz_num,
      vbank_due,
      digital,
    } = formValues;

    const requestData: Record<string, any> = {
      pg,
      pay_method,
      merchant_uid,
      name,
      amount,
      buyer_name,
      buyer_tel,
      buyer_email,
      escrow,
      vbank_due: undefined,
      biz_num: undefined,
      digital: undefined,
    };

    if (pay_method === 'vbank') {
      requestData.vbank_due = vbank_due;
      if (pg === 'danal_tpay') {
        requestData.biz_num = biz_num;
      }
    }
    if (pay_method === 'card') {
      if (card_quota !== 0) {
        requestData.digital = {
          card_quota: card_quota === 1 ? [] : card_quota
        };
      }
    }
    if (pay_method === 'phone') {
      requestData.digital = digital;
    }

    // @ts-ignore
    const {IMP} = window;
    IMP.init(userCode);
    IMP.request_pay(requestData, (response: object) => {
      console.log(response);
      this.router.navigateByUrl(`/payment/result?${queryString.stringify(response)}`);
    });

    console.log(getMethods(PGS[0].value)[0].label);
  }

  handleQuotas(pgVal: string, methodVal: string): void {
    const {isQuotaRequired, quotas} = getQuotas(pgVal, methodVal);
    this.isQuotaRequired = isQuotaRequired;
    this.QuotaOption = quotas;
    this.paymentForm.get('card_quota')?.setValue(this.QuotaOption[0].value);
  }
}
