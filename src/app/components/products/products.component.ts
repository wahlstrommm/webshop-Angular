import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IProducts } from 'src/app/models/IProduct';
import { IProductCategory } from 'src/app/models/IProductCategory';
import { OrderToBasket } from 'src/app/models/OrderToBasket';
import { BasketService } from 'src/app/services/basket.service';
import { CategorySearchService } from 'src/app/services/category-search.service';
import { ProductSearchService } from 'src/app/services/product-search.service';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  searchForm = this.fb.group({
    searchText: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private service: ProductsService,
    private basketService: BasketService,
    private categoryService:CategorySearchService,
    private productSearchService:ProductSearchService
  ) {}

  products: IProducts[] = [];
  productsToBasket: any[] = [];
  productsInfoToBasket:any[]=[]
  itemsToBasket: any;
  allCategory:any[]=[]
  resultFromSearch:IProducts[]=[]
  ngOnInit(): void {
    this.service.productsData$.subscribe((productDataFromApi) => {
      this.products = productDataFromApi;
    });
    this.service.getProducts();
    this.basketService.activeOrder.subscribe(
      (itemsToBasket) => (this.itemsToBasket = itemsToBasket)
    );
    this.categoryService.getCategory();
    this.categoryService.categoryData$.subscribe(
      (allCategory)=>(this.allCategory = allCategory)
    );
    this.productSearchService.productsSerachData$.subscribe((productSerachDataFromApi)=>{
      console.log(productSerachDataFromApi);
      this.resultFromSearch=productSerachDataFromApi;
      console.log(this.resultFromSearch);
    });
  }



  descriptionDisplay: boolean = false;
  toggleDisplay(i: any) {
    console.log(i);
    this.descriptionDisplay = !this.descriptionDisplay;
  }


  addItem(productId: number, product: string, price: number) {

    let order = new OrderToBasket();
    (order.productId = productId),
       (order.product =product),
      (order.price = price);

    this.productsToBasket.push(order);

    this.basketService.updateOrder(this.productsToBasket);
  }


  //För sökning samt för filterning
  stringConvertToNumber:number=0;

  filteredResult:IProducts[]=[];
  filteredList:IProducts[]=[];
  prodContainerAll:boolean=true;
  prodContainerfilter:boolean=false;

filterCategory(value:string){
    this.stringConvertToNumber=Number(value);
    let counter = 0;
    this.filteredList=this.products.filter(product => {

    for (let i = 0; i < product.productCategory.length; i++){
        if(this.stringConvertToNumber== product.productCategory[i].categoryId){
          return true;
        }
    }
    return false;    
    });

    console.log("Listan är " + this.filteredList.length);
    console.log( this.filteredList);
    console.log("loopad antal: " + counter);
   this.categoryService.getCategory();
   this.prodContainerfilter=true;
   this.prodContainerAll=false;
  }

  showAllMovies(){
    this.prodContainerfilter=false;
    this.prodContainerAll=true;
    this.noMoviesContainer=false;
  }

  prodContainerSerach:boolean=false;
  noMoviesContainer:boolean=false;
  serachMovieByInput(){
    console.log(this.searchForm.value.searchText);
    this.productSearchService.getProductsBySerach(this.searchForm.value.searchText);
    
    console.log(this.searchForm.value.searchText);
    console.log(this.resultFromSearch);
    this.prodContainerSerach=true;
    this.prodContainerAll=false;
    this.noMoviesContainer=false;
    if(this.resultFromSearch.length==0){
      this.noMoviesContainer=true;
      this.prodContainerAll=false;
      this.prodContainerSerach=false;
    }
    this.searchForm.value.searchText.clear();
  }
}
