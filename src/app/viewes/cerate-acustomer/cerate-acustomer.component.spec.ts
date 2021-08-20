import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerateACustomerComponent } from './cerate-acustomer.component';

describe('CerateACustomerComponent', () => {
  let component: CerateACustomerComponent;
  let fixture: ComponentFixture<CerateACustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CerateACustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CerateACustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
