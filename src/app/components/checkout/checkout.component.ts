import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IOrder } from 'src/app/models/Order';
import { BasketService } from 'src/app/services/basket.service';
import { CheckoutService } from 'src/app/services/checkout.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  //tar in mina services
  constructor(private basketService: BasketService, public checkoutService:CheckoutService) {}
  //listan från service
  itemsToBasket: any;

  //Måste välja ett betalsätt för att komma vidare!
  choosePayMethod: boolean = false;
  //"disablar" den andra betalsättet vailder men också kvalitesäkra den.
  paypalMethod: boolean = true;
  cardMethod: boolean = true;

  ngOnInit(): void {
    this.basketService.activeOrder.subscribe(
      (itemsToBasket) => (this.itemsToBasket = itemsToBasket)
    );
    this.calSum();
  }
  //bara till för att "lägga över listan" från service
  itemsArrayFromUser: any;
  //Till för att räkna ut totalsumman
  totalSumToPay: number = 0;
  calSum() {
    this.itemsArrayFromUser = this.itemsToBasket;
    var sum = 0;
    for (let i of this.itemsArrayFromUser) {
      sum += i.price;
    }
    this.totalSumToPay = sum;
  }
  //funktionen samt texten som skrivs när man tar bort något
  removedItemText: string = '';
  removeItem(removedproduct: any) {
    this.removedItemText =
      'Du tog bort en produkt! Du har ' +
      this.itemsToBasket.length +
      ' ' +
      'produkter kvar i din varukorg!';

    this.calSum();
  }

  summaryOfOrderContainer: boolean = false;


  userInfoForm = new FormGroup({
    userFName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    userLName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    userAdress: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    userZipCode: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    userMobile: new FormControl(0, [
      Validators.required,Validators.minLength(4)
    ]),
    userEmail: new FormControl('', [
      Validators.required,Validators.minLength(4)]
    ),
  });
  formContainer:boolean=true;
  //paypal
  paymentMethod:string=""
  paypal() {
    this.paymentMethod="Paypal"
    this.choosePayMethod = true;
    this.cardMethod = false;
  }
  //card
  
  card() {
    this.paymentMethod="Card"
    this.choosePayMethod = true;
    this.paypalMethod = false;
  }
  order:any
 

  sendOrder(){//för att rensa product till ""/null
    this.formContainer=false;
    this.thankYouContainer=true;
    this.summaryContainer=false;
    console.log(this.itemsToBasket);
    for (let i = 0; i < this.itemsToBasket.length; i++) {
     this.itemsToBasket[i].product="";
     this.itemsToBasket[i].amount=1;
    }
    this.order=new IOrder((this.userInfoForm.value.userFName+ " " +this.userInfoForm.value.userLName + " "),this.paymentMethod,this.totalSumToPay,this.itemsToBasket)
    this.checkoutService.sendOrder(this.order)
  
  }

  //visar varorna och formulär för kundens uppgifter
  itemOverview: boolean = true;
  fromContainer: boolean = false;

  thankYouContainer:boolean=false;

  summaryContainer:boolean=true;
  showInformationForm() {
    this.fromContainer = !this.fromContainer;
    this.itemOverview = !this.itemOverview;
  }
}
