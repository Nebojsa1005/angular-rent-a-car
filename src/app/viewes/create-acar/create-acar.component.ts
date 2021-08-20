import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/services/carsService.service';

@Component({
  selector: 'app-create-acar',
  templateUrl: './create-acar.component.html',
  styleUrls: ['./create-acar.component.css']
})
export class CreateACarComponent implements OnInit {

  carName: string = ''
  carPicture: string = ''
  pricePerDay!: number

  constructor(
    private carService: CarsService
  ) { }

  ngOnInit(): void {
  }

  submit() {
    const carData = {
      carName: this.carName,
      carPicture: this.carPicture,
      pricePerDay: this.pricePerDay
    }
    this.carService.postCar(carData).subscribe(data => console.log(data))

    this.carName = ''
    this.carPicture = ''
    this.pricePerDay = 0
  }
}
