import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CarsComponent } from './viewes/cars/cars.component';
import { CreateACarComponent } from './viewes/create-acar/create-acar.component';
import { CustomersComponent } from './viewes/customers/customers.component';
import { CerateACustomerComponent } from './viewes/cerate-acustomer/cerate-acustomer.component';
import { RentACarComponent } from './viewes/rent-a-car/rent-a-car.component';

const routes: Routes = [
  { path: '', component: CarsComponent },
  { path: 'createCar', component: CreateACarComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'createCustomer', component: CerateACustomerComponent },
  { path: 'rentCar/:id', component: RentACarComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CarsComponent,
    CreateACarComponent,
    CustomersComponent,
    CerateACustomerComponent,
    RentACarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
