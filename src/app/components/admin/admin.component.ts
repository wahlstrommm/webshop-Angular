import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/models/Order';
import { DeleteOrdersService } from 'src/app/services/delete-orders.service';
import { GetOrdersForAdminService } from 'src/app/services/get-orders-for-admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  orders:any=[]
  constructor(private orderService:GetOrdersForAdminService,private deleteService:DeleteOrdersService) { }

  ngOnInit(): void {
    this.orderService.ordersData$.subscribe((orderDataFromApi)=>{
      this.orders=orderDataFromApi;
      this.orderOverview=this.orders;
      var sum = 0;

      for (var i of this.orderOverview) {
        sum += i.totalPrice;
      }
      this.totalSumToPay = sum;
    });
    this.orderService.getOrders();
  }
  orderOverview:any;
  totalSum:number=0;

  totalSumToPay: number = 0;
  renderList(){
    //Till för att räkna ut totalsumman
  
      var sum = 0;
      for (var i of this.orderOverview) {
        sum += i.totalPrice;
      }
      this.totalSumToPay = sum;
    
  }


removeOrder(ordersId:number,removedItem:any){
  this.deleteService.deleteOrders(ordersId);
  this.renderList();

}
}