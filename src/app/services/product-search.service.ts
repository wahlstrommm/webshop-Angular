import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProducts } from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {

  constructor(private http:HttpClient) { }
  private productsSerachData = new Subject<IProducts[]>();

  productsSerachData$ = this.productsSerachData.asObservable();
  searchResult:any[]=[]

  getProductsBySerach(serachInput:string) {
    this.http
      .get<IProducts[]>(environment.searchUrl+serachInput)
      .subscribe((productSerachDataFromApi) => {
        this.productsSerachData.next(productSerachDataFromApi);
        console.log(productSerachDataFromApi);
        this.searchResult=productSerachDataFromApi;
      });
  }
}
