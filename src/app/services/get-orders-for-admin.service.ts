import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../models/Order';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetOrdersForAdminService {
  private ordersData= new Subject<IOrder>();
  ordersData$ = this.ordersData.asObservable();

  constructor(private http:HttpClient) { }

  getOrders() {
    this.http
      .get<any>(environment.myCompanyOrdersURL)
      .subscribe((orderDataFromApi) => {
        console.log(orderDataFromApi);
        this.ordersData.next(orderDataFromApi);
      });
  }
}
