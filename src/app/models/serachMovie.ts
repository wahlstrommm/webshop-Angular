import { IProductCategory } from "./IProductCategory";

export  class Products implements IProductCategory{
    // id: number;
    // name: string;
    // description: string;
    // price: number;
    // imageUrl: string;
    // year: number;
    // productCategory:[]=[]
    // constructor(id:number,name:string,description:string,price:number,imageUrl:string,year:number,productCategory:[]){
    //     this.id=id,this.name=name,this.description=description,this.price=price,this.imageUrl=imageUrl,this.year=year,this.productCategory=productCategory;
    // }
    categoryId: number=0;
    category: null=null;
    constructor(categoryId:number){
        this.categoryId=categoryId;
    }
}