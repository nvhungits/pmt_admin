import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from  './product';
import { Company } from  './company';
import { Subcategory } from  './subcategory';
import { Observable } from  'rxjs';
import { Category } from './category';
import { News } from './news';
import { Image } from './image';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  PHP_API_SERVER = "https://phucminhtam.net/php";

  constructor(private httpClient: HttpClient) { }

  getProduct(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.PHP_API_SERVER}/product.php`);
  }

  updateProduct(product: Product): Observable<Product>{
    return this.httpClient.put<Product>(`${this.PHP_API_SERVER}/update_product.php`, product);
  }

  deleteProduct(id: number){
    return this.httpClient.delete<Product>(`${this.PHP_API_SERVER}/delete_product.php/?id=${id}`);
  }

  getCompanyInfo(): Observable<Company[]>{
    return this.httpClient.get<Company[]>(`${this.PHP_API_SERVER}/company.php`);
  }

  updateCompanyInfo(company: Company): Observable<Company>{
    return this.httpClient.put<Company>(`${this.PHP_API_SERVER}/update_company.php`, company);
  }
  
  getSubcategory(): Observable<Subcategory[]>{
    return this.httpClient.get<Subcategory[]>(`${this.PHP_API_SERVER}/subcategory.php`);
  }

  getCategory(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(`${this.PHP_API_SERVER}/category.php`);
  }

  //News
  getNews(): Observable<News[]>{
    return this.httpClient.get<News[]>(`${this.PHP_API_SERVER}/news.php`);
  }
  updateNews(news: News): Observable<News>{
    return this.httpClient.put<News>(`${this.PHP_API_SERVER}/update_news.php`, news);
  }
  deleteNews(id: number){
    return this.httpClient.delete<News>(`${this.PHP_API_SERVER}/delete_news.php/?id=${id}`);
  }

  //Image
  getImage(): Observable<Image[]>{
    return this.httpClient.get<Image[]>(`${this.PHP_API_SERVER}/image.php`);
  }
  updateImage(image: Image): Observable<Image>{
    return this.httpClient.put<Image>(`${this.PHP_API_SERVER}/update_image.php`, image);
  }

  uploadImage(fileToUpload: File): Observable<Response> {
    const formData = new FormData();
    formData.append('fileToUpload', fileToUpload);
    return this.httpClient.post<Response>(`${this.PHP_API_SERVER}/product_image_upload.php`, formData);
  }
}
