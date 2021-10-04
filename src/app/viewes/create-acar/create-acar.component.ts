import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CarsService } from 'src/app/services/carsService.service';

@Component({
  selector: 'app-create-acar',
  templateUrl: './create-acar.component.html',
  styleUrls: ['./create-acar.component.css']
})
export class CreateACarComponent implements OnInit, OnDestroy {

  postCarSub?: Subscription

  formGroup = this.fb.group({
    brand: [null, [Validators.required, Validators.minLength(3)]],
    model: [null, [Validators.required, Validators.minLength(2)]],
    constructionYear: [null, [Validators.required, Validators.min(2005)]],
    available: [null, Validators.required],
    numberOfSeats: [null,[Validators.required, Validators.min(0)]],
    fuelType: [null, Validators.required],
    image: [null, Validators.required],
    price: [null, [Validators.required, Validators.min(10)]]

  })

  constructor(
    private carService: CarsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy () {
    this.postCarSub?.unsubscribe()
  }

  submit() {
    this.postCarSub = this.carService.postCar(this.formGroup.value).subscribe()
    this.formGroup.setValue({
      brand: '',
      model: '',
      constructionYear: '',
      available: '',
      numberOfSeats: '',
      fuelType: '',
      image: '',
      price: ''
    })
  }
}
