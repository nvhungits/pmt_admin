import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { Company } from '../company';
import { DomSanitizer } from '@angular/platform-browser';
import { Image } from '../image';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  company: Company;
  selectedFile: ImageSnippet;
  imageBanners: Image[] = new Array<Image>()

  constructor(private apiService: ApiService, private DomSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getCompanyInfo()
    this.getImage()
  }

  getCompanyInfo(){
    this.apiService.getCompanyInfo().subscribe((companies: Company[])=>{
      this.company = companies.length > 0 ? companies[0] : undefined;
      if(this.company.logo_base64 == ''){
        this.company.logo_base64 = "http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=no+image";
      }
    });
  }

  getImage(){
    this.apiService.getImage().subscribe((images: Image[])=>{
      this.imageBanners = images
    })
  }
  saveImage(item){
    this.apiService.updateImage(item).subscribe((image: Image)=>{
      if(item.id > 0)
        alert("cập nhập")
      else
        alert("đã tạo 1 banner")
    });
  }

  saveCompany(){
    this.apiService.updateCompanyInfo(this.company).subscribe((company: Company)=>{
      if(this.company.id > 0)
        alert("đã được cập nhập");
      else
        alert("Không thể cập nhập");
    });
  }

  changeImage(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.company.logo_base64 = event.target.result;
    });
    reader.readAsDataURL(file);
  }

  addImageBanner(){
    this.imageBanners.push({
      id: -1,
      name: 'slider' + (this.imageBanners.length + 1),
      type: 'slider',
      status: 'active',
      base64: ''
    })
  }

  changeImageBanner(imageInput: any, item) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      item.base64 = event.target.result
      console.log(this.imageBanners)
    });
    reader.readAsDataURL(file);
  }

}
