import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  constructor(private basketService: BasketService) {}
  itemsToBasket: any;
  itemsInfoToBasket:any;

  ngOnInit(): void {
    this.basketService.activeOrder.subscribe(
      (itemsToBasket) => (this.itemsToBasket = itemsToBasket));
    this.itemsArrayFromUser=this.itemsToBasket
    }
  
  itemsArrayFromUser: any;

  shield: string = 'assets/shield.svg';
}
