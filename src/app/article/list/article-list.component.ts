import { Component, OnInit } from '@angular/core';

import { Article } from '../../models/article';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['../article.component.scss']
})

export class ArticleListComponent implements OnInit {
  public articles: Array<Article>;
  private currentPage = 1;

  constructor(
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.fetchArticles(this.currentPage);
  }

  loadPreviousPage(): void {
    let page = 0;
    page = ++this.currentPage;
    this.fetchArticles(page);
  }

  loadNextPage(): void {
    let page = 0;
    this.currentPage === 0 ?
      page = 0 : page = --this.currentPage;
    this.fetchArticles(page);
  }

  errorHandling(err): void {
    if (err.error instanceof Error) {
      console.log('error: ' + err.error.message);
    } else {
      console.log('error: ' + err.status + ', detail: ' + err.error);
    }
  }

  private fetchArticles(page: number): void {
    this.apiService.getArticleList(page).subscribe(
      articles => {
        if (this.articles === undefined) {
          this.articles = articles;
        } else {
          this.articles = this.articles.concat(articles);
        }
      },
      (err: HttpErrorResponse) => this.errorHandling(err)
    );
  }
}
