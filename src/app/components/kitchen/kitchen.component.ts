import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.scss']
})
export class KitchenComponent implements OnInit {

  articles: Article[];

  constructor(private articleService: ArticleService) {
  }

  ngOnInit() {
    this.articleService.getArticleList(0, 100).subscribe((articles: Article[]) => {
      this.articles = articles;
    });
  }

}
