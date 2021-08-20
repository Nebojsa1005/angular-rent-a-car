import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { CarsService } from 'src/app/services/carsService.service';

@Component({
  selector: 'app-rent-a-car',
  templateUrl: './rent-a-car.component.html',
  styleUrls: ['./rent-a-car.component.css']
})
export class RentACarComponent implements OnInit {

  wantedCar: any 
  

  constructor(
    private route: ActivatedRoute,
    private carsService: CarsService
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.params.id
    this.carsService.rentACar(id).subscribe(data => {
      this.carsService.rentACarHandler.next(data)
    })
    this.carsService.rentACarHandler.subscribe(data => {
      this.wantedCar = data
    })
  }

}
