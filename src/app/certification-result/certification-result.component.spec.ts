import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationResultComponent } from './certification-result.component';

describe('CertificationResultComponent', () => {
  let component: CertificationResultComponent;
  let fixture: ComponentFixture<CertificationResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificationResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
