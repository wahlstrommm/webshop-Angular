import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private currentOrder = new BehaviorSubject<any[]>([]);
  activeOrder = this.currentOrder.asObservable();

  updateOrder(itemsToBasket: any[]) {
    this.currentOrder.next(itemsToBasket);
  }
  
}
