import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customerService.service';

@Component({
  selector: 'app-cerate-acustomer',
  templateUrl: './cerate-acustomer.component.html',
  styleUrls: ['./cerate-acustomer.component.css']
})
export class CerateACustomerComponent implements OnInit {
  fullName: string = ''
  address: string = ''
  age!: number | null
  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    
  }

  submit() {
    const customerData = {
      fullName: this.fullName,
      address: this.address,
      age: this.age
    }
    this.customerService.postCustomer(customerData).subscribe()
    this.fullName = ''
    this.address = ''
    this.age = null
  }

}
