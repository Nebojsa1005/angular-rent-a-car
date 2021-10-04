import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarsService } from 'src/app/services/carsService.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit, OnDestroy {
  cars: any = []
  search: string = ''
  carsSub?: Subscription
  filteredCarsSub?: Subscription

  constructor(
    private carsService: CarsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carsSub = this.carsService.getCars().subscribe(data => {
      this.cars = data      
    })
  }

  ngOnDestroy() {
    this.carsSub?.unsubscribe()
    this.filteredCarsSub?.unsubscribe()
  }

  onSearch() {
    if (this.search.length > 0) {
      let filteredCars: any = []
       filteredCars = this.cars.filter((car: any) => {
        return car.carName.toLowerCase().includes(this.search.toLowerCase())        
      })     
      this.cars = filteredCars 
    } else {
      this.carsSub = this.carsService.getCars().subscribe(data => {
        this.cars = data
      })
    }
  }

  filterSearch(e: string) {
    this.filteredCarsSub = this.carsService.filterCars(e).subscribe((data: any) => {
      this.cars = data
    }) 
  }

  rent(id: number) {
    this.router.navigate(['/rentCar', id])
  }

}
