import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { map } from 'rxjs/operators'

import { Car } from '../interfaces/car'

@Injectable({
    providedIn: 'root'
})

export class CarsService {
    rentACarHandler = new Subject<any>()
    cars: Car[] = []

    url: string = 'https://angular-rent-a-car-default-rtdb.firebaseio.com/cars.json'

    constructor(private http: HttpClient) {}

    getCars(): Observable<any> {
        if (this.cars.length > 0) {
            return of(this.cars)
        }
        return this.http.get<any>(this.url).pipe(map(data => {
            let formatedData = []
            for (let key in data) {
                formatedData.push({
                    brand: data[key].brand,
                    model: data[key].model,
                    id: key,
                    numberOfSeats: data[key].numberOfSeats,
                    image: data[key].image,
                    price: data[key].price,
                    constructionYear: data[key].constructionYear,
                    fuelType: data[key].fuleType,
                    available: data[key].available
                })
            }
            this.cars = formatedData           
            return this.cars
        }))
    }

    filterCars(value: string) {
        if (value.length === 0) {
            return of(this.cars)
        }
        let filteredData = this.cars.filter((car: Car) => {
            return car.brand.includes(value)
        })
        return of(filteredData)
    }

    postCar(data: Car): Observable<Car> {
        return this.http.post<Car>(this.url, data)
    }

    rentACar(id: string) {
        return this.http.get<Car[]>(this.url).pipe(map(data => {
            let wantedCar = null            
            for (let key in data) {                
                if ( key === id ) {                  
                    wantedCar = data[key]
                }
            }
            return wantedCar
        }))
    }
}