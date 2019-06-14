import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/news';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: number
  news: News = {
    id: -1,
    title: '',
    short_description: '',
    description: '',
    created: new Date().toLocaleDateString(),
    tags: '',
    views: 0,
    comments_count: 0,
    image: 'data:image/png;base64,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',
    created_by: 'admin',
    status: 'Mới' 
  }
  imageProduct: string;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  }

  constructor(private route: ActivatedRoute,private DomSanitizer: DomSanitizer, private apiService: ApiService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = parseInt(params.get("id"));
    })
    if(this.id > 0){
      this.getNewsById(this.id)
    }
  }

  changeImage(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.news.image = event.target.result;
    });
    reader.readAsDataURL(file);
  }

  getNewsById(id){
    this.apiService.getNews().subscribe((news: News[])=>{
      for(var i = 0; i < news.length; i++){
        if(news[i].id == id)
        {
          this.news = news[i]
          break;
        } 
      }
    })
  }

  saveNews() {
    this.apiService.updateNews(this.news).subscribe((news: News)=>{
      if(this.news.id > 0)
        alert("Tin tức đã được cập nhập");
      else
        alert("Tin tức đã được tạo");
    });
}

}
