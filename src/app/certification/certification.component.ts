import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as queryString from 'query-string';

@Component({
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css', '../styles/common.form.scss']
})
export class CertificationComponent implements OnInit {
  router: Router;
  certificationForm = new FormGroup({
    merchant_uid: new FormControl('min_' + new Date().getTime(), [
      Validators.required
    ]),
    name: new FormControl(''),
    phone: new FormControl(''),
    min_age: new FormControl()
  });

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    /* 가맹점 식별코드 */
    const userCode = 'imp10391932';

    const formValues = this.certificationForm.getRawValue();
    const {
      merchant_uid,
      name,
      phone,
      min_age
    } = formValues;

    const data: Record<string, any> = {
      merchant_uid,
      name: undefined,
      phone: undefined,
      min_age: undefined
    };

    if (name) {
      data.name = name;
    }
    if (phone) {
      data.phone = phone;
    }
    if (min_age) {
      data.min_age = min_age;
    }

    // @ts-ignore
    const {IMP} = window;
    IMP.init(userCode);
    IMP.certification(data, (response: object) => {
      console.log(response);
      this.router.navigateByUrl(`/certification/result?${queryString.stringify(response)}`);
    });
  }

}
