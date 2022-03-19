import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  cart: string = 'assets/cart.svg';
  admin: string = 'assets/admin.svg';
  prod: string = 'assets/moreP.svg';
  cCard: string = 'assets/cCard.svg';
  home: string = 'assets/home.svg';
  logo:string='assets/logoMMM.svg';

  itemsToBasket: any;

  constructor(private basketService: BasketService) {}
  
  ngOnInit(): void {
    this.basketService.activeOrder.subscribe(
      (itemsToBasket) => (this.itemsToBasket = itemsToBasket)
    );
  }
}
