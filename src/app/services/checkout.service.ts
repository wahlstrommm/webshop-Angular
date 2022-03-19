import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IOrder } from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private http: HttpClient) {}
  sendOrder(order:any){
    const httpHeaders = new HttpHeaders();
    httpHeaders.append("Content-Type","application/json");
    this.http.post<IOrder>(environment.ordersURL,order,).subscribe((orderToApi)=>{
      console.log(orderToApi);
    })
  
}}
    
  
 





