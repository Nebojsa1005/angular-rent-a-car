import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customerService.service';

@Component({
  selector: 'app-cerate-acustomer',
  templateUrl: './cerate-acustomer.component.html',
  styleUrls: ['./cerate-acustomer.component.css']
})
export class CerateACustomerComponent implements OnInit {

  formGroup = this.fb.group({
    firstName: [null, [Validators.required, Validators.minLength(4)]],
    lastName: [null, [Validators.required, Validators.minLength(4)]],
    phone: [null, [Validators.required, Validators.minLength(8)]],
    address: [null, [Validators.required, Validators.minLength(3)]],
    age: [null, [Validators.required, Validators.min(18)]],
    email: [null, [Validators.required, Validators.email]],
    numRented: 0,
    lastRent: null
  })

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private route: Router
  ) { }

  ngOnInit(): void {
    
  }

  submit() {
    console.log(this.formGroup);
    
    if (!this.formGroup.invalid) {
      this.customerService.postCustomer(this.formGroup.value).subscribe(() => {
        return this.route.navigate(['/customers']);
      })
    }
  }

}
