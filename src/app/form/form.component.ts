import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Product} from "../product";
import { ApiService } from '../api.service';
import { Category } from '../category';
import { Subcategory } from '../subcategory';
import { DomSanitizer } from '@angular/platform-browser'

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  id: number;
  product:  Product;
  categories: Category[];
  subcategories: Subcategory[];
  selectedProduct:  Product  = { 
    id :  null ,
    name: null,
    description: null,
    image: null,
    status: null,
    price: null,
    unit: null,
    category_id: null,
    subcategory_id: null,
    image_base64: null
  };
  selectedFile: ImageSnippet;
  imageProduct: string;


  constructor(private route: ActivatedRoute, private apiService: ApiService, private DomSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = parseInt(params.get("id"));
    })
    this.apiService.getProduct().subscribe((products: Product[])=>{
      for(var i = 0; i < products.length; i++){
        if(products[i].id == this.id){
          this.product = products[i];
          break;
        }
      }
      console.log(this.product);
    })
    this.apiService.getCategory().subscribe((categories: Category[])=>{
      this.categories = categories;
    })
    this.apiService.getSubcategory().subscribe((subcategories: Subcategory[])=>{
      this.subcategories = subcategories;
    })
  }

  saveProduct() {
      this.apiService.updateProduct(this.product).subscribe((product: Product)=>{
        /*
        console.log(this.selectedFile);
        if(this.selectedFile){
        this.apiService.uploadImage(this.selectedFile.file).subscribe(
          (res) => {
            alert("Sản phẩm đã được cập nhập + Image");
          },
          (err) => {
            console.log(err);
          })
        }
        
        else{
          alert("Sản phẩm đã được cập nhập");
        }
        */
        alert("Sản phẩm đã được cập nhập");
      });
  }

  changeImage(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      //this.selectedFile = new ImageSnippet(event.target.result, file);
      this.product.image_base64 = event.target.result;
    });
    reader.readAsDataURL(file);
  }

}
