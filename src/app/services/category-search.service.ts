import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategories } from '../models/ICategories';

@Injectable({
  providedIn: 'root'
})
export class CategorySearchService {
  private categoryData = new Subject<ICategories[]>();

  categoryData$ = this.categoryData.asObservable();
  constructor(private http: HttpClient) { }
  category:ICategories[]=[]
 

  getCategory() {
    this.http
      .get<ICategories[]>(environment.categoriesURL)
      .subscribe((categoryDataFromApi:ICategories[]) => {
        this.categoryData.next(categoryDataFromApi);
        console.log(categoryDataFromApi);
        this.category=categoryDataFromApi;
        console.log(this.category);

      });
  }

}
