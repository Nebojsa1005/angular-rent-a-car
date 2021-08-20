import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class CustomerService {
    url: string = 'https://angular-rent-a-car-default-rtdb.firebaseio.com/customers.json'

    constructor(
        private http: HttpClient
    ) {}

    getCustomers(): Observable<any> {
        return this.http.get<any>(this.url).pipe(map(data => {
            let formatedData = [];
            for (let key in data) {
                formatedData.push({
                    fullName: data[key].fullName,
                    id: key,
                    address: data[key].address,
                    age: data[key].age
                });
            }
            return formatedData;
        }));
    }

    postCustomer(customerData: any) {
        return this.http.post<any>(this.url, customerData)
    }
}