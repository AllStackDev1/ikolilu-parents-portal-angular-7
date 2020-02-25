import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentswizardComponent } from './paymentswizard.component';

describe('PaymentswizardComponent', () => {
  let component: PaymentswizardComponent;
  let fixture: ComponentFixture<PaymentswizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentswizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentswizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
