import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Product} from "../product";
import { ApiService } from '../api.service';

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
  selectedProduct:  Product  = { 
    id :  null ,
    name: null,
    description: null,
    image: null,
    status: null,
    price: null,
    unit: null,
    category_id: null,
    subcategory_id: null
  };
  selectedFile: ImageSnippet;


  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

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
    })
  }

  saveProduct() {
    
      this.apiService.updateProduct(this.product).subscribe((product: Product)=>{
        alert("Sản phẩm đã được cập nhập");
      });
  }


  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
    console.log(this.selectedFile);
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
    console.log(this.selectedFile);
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    console.log(imageInput);
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.apiService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        })
    });
  }

}
