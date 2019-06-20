import { Component, OnInit } from '@angular/core';
import { News } from '../news';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: News[] = new Array<News>()

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getNews()
  }

  getNews(){
    this.apiService.getNews().subscribe((news: News[])=>{
      this.news = news;
      if(this.news.length == 0){
        this.news.push({
          id: 9999,
          title: 'News is not found',
          short_description: 'db does not have any news',
          description: 'db does not have any news, please check the connection or database',
          created: new Date().toLocaleDateString(),
          tags: 'not found, hong am, phuc minh tam, pmt, phu khoa, mocha, my pham',
          views: 9999,
          comments_count: 9999,
          image: 'img1.jpg',
          created_by: 'admin',
          status: 'New'
        })
      }
    })
  }

  deleteNews(news, index){
    if(confirm("Bạn muốn xoá tin tức này ?")) {
      this.apiService.deleteNews(news.id).subscribe((news: News)=>{
        this.news.splice(index, 1);
      });
    }
  }

}
