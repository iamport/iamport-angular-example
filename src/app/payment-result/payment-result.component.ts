import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import * as queryString from 'query-string';
import {checkTrue} from './utils';

@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.scss']
})
export class PaymentResultComponent implements OnInit {
  location: Location;

  resultData = {
    merchantUid: '',
    errorMsg: '',
    impUid: '',
    isSuccess: false,
  };

  constructor(location: Location) {
    this.location = location;
  }

  ngOnInit(): void {
    const query = queryString.parse(location.search);
    const { merchant_uid, error_msg, imp_uid, success, imp_success } = query;

    const isSuccess = checkTrue(imp_success) || checkTrue(success);

    this.resultData = {
      merchantUid: merchant_uid as string,
      errorMsg: error_msg as string,
      impUid: imp_uid as string,
      isSuccess,
    };

    console.log(this.resultData);
  }
}
