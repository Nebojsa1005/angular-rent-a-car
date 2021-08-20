import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarsService } from 'src/app/services/carsService.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars: any = []
  search: string = ''

  constructor(
    private carsService: CarsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carsService.getCars().subscribe(data => {
      this.cars = data
      console.log(data);
      
    })
  }

  onSearch() {
    if (this.search.length > 0) {
      let filteredCars: any = []
       filteredCars = this.cars.filter((car: any) => {
        return car.carName.toLowerCase().includes(this.search.toLowerCase())        
      })     
      this.cars = filteredCars 
    } else {
      this.carsService.getCars().subscribe(data => {
        this.cars = data
      })
    }
  }

  rent(id: number) {
    this.router.navigate(['/rentCar', id])
  }

}
