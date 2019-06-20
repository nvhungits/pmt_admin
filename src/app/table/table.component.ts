import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../product';
import { Company } from '../company';
import { Subcategory } from '../subcategory';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private apiService: ApiService, private DomSanitizer: DomSanitizer) { }

  products:  Product[];
  subcategories:  Subcategory[];
  company:  Company;

  ngOnInit() {
    this.apiService.getProduct().subscribe((products: Product[])=>{
      this.products = products;
    })

    this.apiService.getCompanyInfo().subscribe((companies: Company[])=>{
      if(companies.length > 0)
      {
        for(let i = 0; i < companies.length; i++){
          if(companies[i].id == 1){
            this.company = companies[0];
            break
          }
        }
      }
    })

    this.apiService.getSubcategory().subscribe((subcategories: Subcategory[])=>{
      this.subcategories = subcategories;
    })
  }

  getSubcategoryByCategoryId(categoryId){
    let subcategories = [];
    for(let i = 0; i < this.subcategories.length; i++){
        if(this.subcategories[i].category_id == categoryId){
          subcategories.push(this.subcategories[i]);
        }
    }
    return subcategories;
  }

  getProductByCategoryId(categoryId){
    let products = [];
    for(let i = 0; i < this.products.length; i++){
        if(this.products[i].category_id == categoryId){
          products.push(this.products[i]);
        }
    }
    return products;
  }

  getProductBySubCategoryIdAndCategoryId(subCategoryId, categoryId){
    let products = [];
    for(let i = 0; i < this.products.length; i++){
        if(this.products[i].category_id == categoryId && this.products[i].subcategory_id == subCategoryId){
          products.push(this.products[i]);
        }
    }
    return products;
  }

  deleteProduct(product, index){
    if(confirm("Bạn muốn xoá sản phẩm " + product.name + " ?")) {
      this.apiService.deleteProduct(product.id).subscribe((product: Product)=>{
        this.products.splice(index, 1);
      });
    }
  }

}
