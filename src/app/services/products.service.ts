import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProducts } from '../models/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsData = new Subject<IProducts[]>();

  productsData$ = this.productsData.asObservable();

  constructor(private http: HttpClient) {}

  getProducts() {
    this.http
      .get<IProducts[]>(environment.productsURL)
      .subscribe((productDataFromApi) => {
        this.productsData.next(productDataFromApi);
      });
  }
}
