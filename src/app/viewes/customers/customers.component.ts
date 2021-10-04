import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customerService.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, OnDestroy {
  url: string = 'https://angular-rent-a-car-default-rtdb.firebaseio.com/'
  customers: Customer[] = []
  customersSub?: Subscription

  constructor(
    private customerService: CustomerService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.customersSub = this.customerService.getCustomers().subscribe(data => {
      this.customers = data
    })
  }

  ngOnDestroy() {
    this.customersSub?.unsubscribe()
  }

  deleteCustomer(customer: Customer) {
    const wantedCustomer = this.customers.indexOf(customer)
    this.customers.splice(wantedCustomer, 1)
    
    this.customerService.deleteCustomer(customer.id).subscribe()
  }

  editCustomer(id: string) {

  }

}
