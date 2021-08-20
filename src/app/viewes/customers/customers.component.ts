import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customerService.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: any = []

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data      
    })
  }

}
