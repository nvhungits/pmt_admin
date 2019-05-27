import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { Company } from '../company';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  company: Company;

  constructor(private apiRest: ApiService, private DomSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getCompanyInfo();
  }

  getCompanyInfo(){
    this.apiRest.getCompanyInfo().subscribe((companies: Company[])=>{
      this.company = companies.length > 0 ? companies[0] : undefined;
    });
  }

}
