import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Car } from 'src/app/interfaces/car';
import { Customer } from 'src/app/interfaces/customer';
import { CarsService } from 'src/app/services/carsService.service';
import { CustomerService } from 'src/app/services/customerService.service';

@Component({
  selector: 'app-rent-a-car',
  templateUrl: './rent-a-car.component.html',
  styleUrls: ['./rent-a-car.component.css']
})
export class RentACarComponent implements OnInit {

  selectedCustomer?: Customer
  customers?: Customer[]
  wantedCar?: Car 
  fullPrice: number = 0
  private _numOfDays!: number

  get numOfDays () {
    
    return this._numOfDays
  }
  
  set numOfDays(value) {
    if (this.selectedCustomer?.lastRent?.getTime()) {
    const date1 = this.selectedCustomer?.lastRent?.getTime()
    const date2 = new Date().getTime()
      if ((date2 - date1  / (1000 * 3600 * 24)) < 30) {
        this._numOfDays = value
        if (value > 7) {
          this.discount = 10
        } else if (value >= 5) {
          this.discount = 7
        } else if (value >= 3) {
          this.discount = 5
        } else {
          this.discount = 0
        }
      } 
    }else {
      this.discount = 0
    }
    this.fullPrice = this.wantedCar!.price * value - this.wantedCar!.price * value * this.discount / 100
  }

  private _discount!:number

  get discount(): number {
    return this._discount
  }

  set discount(value) {
    this._discount = value    
  }

  constructor(
    private route: ActivatedRoute,
    private carsService: CarsService,
    private customersService: CustomerService,
    private fb: FormBuilder
  ) { }

  formGroup: FormGroup = this.fb.group({
    customer: [null, [Validators.required]],
    days: [null, [Validators.required, Validators.min(1), Validators.max(30)]]
  })

  

  ngOnInit() {
    let id = this.route.snapshot.params.id
    this.carsService.rentACar(id).subscribe(data => {
      this.carsService.rentACarHandler.next(data)
    })
    this.carsService.rentACarHandler.subscribe(data => {
      this.wantedCar = data
      this.wantedCar!.available--
      this.fullPrice = data.price
    })

    this.customersService.getCustomers().subscribe(data => {      
      this.customers = data
      console.log(this.customers);
      
    })
  }



  submit() {
    if (this.selectedCustomer) {
      this.selectedCustomer!.lastRent = new Date()
      this.selectedCustomer.numRented++
      console.log(this.selectedCustomer!.numRented);
      
      this.customersService.rentCar(this.selectedCustomer!.id).subscribe()
    }
  }
}
