import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/models/IProduct';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private service: ProductsService) {}
  products: IProducts[] = [];

  ngOnInit(): void {
    this.service.productsData$.subscribe((productDataFromApi) => {
      this.products = productDataFromApi;
    });
    this.service.getProducts();
  }
}
