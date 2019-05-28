import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { Company } from '../company';
import { DomSanitizer } from '@angular/platform-browser';

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

  constructor(private apiService: ApiService, private DomSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getCompanyInfo();
  }

  getCompanyInfo(){
    this.apiService.getCompanyInfo().subscribe((companies: Company[])=>{
      this.company = companies.length > 0 ? companies[0] : undefined;
      if(this.company.logo_base64 == ''){
        this.company.logo_base64 = "http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=no+image";
      }
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

}
