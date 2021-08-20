import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { filter, map } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})

export class CarsService {
    rentACarHandler = new Subject<any>()
    url: string = 'https://angular-rent-a-car-default-rtdb.firebaseio.com/cars.json'

    constructor(private http: HttpClient) {}

    getCars(): Observable<any> {
        return this.http.get<any>(this.url).pipe(map(data => {
            let formatedData = []
            for (let key in data) {
                formatedData.push({
                    carName: data[key].carName,
                    id: key,
                    carPicture: data[key].carPicture,
                    pricePerDay: data[key].pricePerDay
                })
            }
            return formatedData
        }))
    }

    postCar(data: any): Observable<any> {
        return this.http.post(this.url, data)
    }

    rentACar(id: string) {
        return this.http.get<any>(this.url).pipe(map(data => {
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