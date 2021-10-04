import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { map } from "rxjs/operators";

import { Customer } from '../interfaces/customer'

@Injectable({
    providedIn: 'root'
})

export class CustomerService {
    customers: Customer[] = []
    planeUrl: string = 'https://angular-rent-a-car-default-rtdb.firebaseio.com/customers'
    url: string = 'https://angular-rent-a-car-default-rtdb.firebaseio.com/customers.json'

    constructor(
        private http: HttpClient
    ) {}

    getCustomers(): Observable<Customer[]> {
        if (this.customers.length > 0) {
            return of(this.customers)
        }
        return this.http.get<any>(this.url).pipe(map(data => {
            let formatedData = [];
            for (let key in data) {
                formatedData.push({
                    firstName: data[key].firstName,
                    lastName: data[key].lastName,
                    phone: data[key].phone,
                    address:data[key].address,
                    age: data[key].age,
                    email: data[key].email,
                    id: key,
                    numRented: data[key].numRented,
                    lastRent: data[key].lastRent
                });
            }
            this.customers = formatedData
            console.log(this.customers);
                        
            return this.customers
        }));
    }

    postCustomer(customerData: Customer) {       
        return this.http.post<Customer>(this.url, customerData)
    }

    deleteCustomer(id: string):Observable<any> {
        return this.http.delete<Customer>(this.planeUrl + `/${id}.json`)
    }

    rentCar(id: string) {
        const wantedCustomer = this.customers.filter(customer => {
            return customer.id === id
        })        
        return this.http.put<Customer>(this.planeUrl + `/${id}.json`, wantedCustomer[0])
    }
}