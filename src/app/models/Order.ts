import { IOrderRows } from './IOrderRows';

export class IOrder {
  id: number=0;
  companyId:number= 45;
  created: string=(new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]);
  createdBy:string='';
  paymentMethod: string="";
  totalPrice: number=0;
  orderRows: IOrderRows[]=[];
  constructor(createdBy:string,paymentMethod:string,totalPrice:number,orderRows:IOrderRows[]){
    this.createdBy=createdBy,this.paymentMethod=paymentMethod,this.totalPrice=totalPrice,this.orderRows=orderRows;
  }
  
}
