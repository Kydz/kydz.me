import { Component } from "@angular/core";

import { Article } from "./article";
import { ARTICLES } from "./mock-article";

@Component({
  selector: 'article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})

export class ArticleListComponent {
  getArticles(): Article[] {    
    return ARTICLES;
  }
}