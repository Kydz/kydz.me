import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Article } from './article';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article.component.scss']
})

export class ArticleListComponent implements OnInit {
  private apiUrl = 'http://localhost:8088/article';
  private currentPage = 0;
  private perpage = 18;
  public articles: Array<Article>;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchArticles(this.getRequestUrl(this.currentPage));
  }

  getRequestUrl(page: number): string {
    let url: string;
    url = this.apiUrl + `?perpage=${ this.perpage }&page=${ page }`;
    return url;
  }

  loadPreviousPage(): void {
    let page = 0;
    page = ++this.currentPage;
    this.fetchArticles(this.getRequestUrl(page));
  }

  loadNextPage(): void {
    let page = 0;
    this.currentPage === 0 ?
    page = 0 : page = --this.currentPage;
    this.fetchArticles(this.getRequestUrl(page));
  }

  fetchArticles(url: string): void {
    this.http.get<Article[]>(url)
    .subscribe(
      articles =>  {
        if (this.articles === undefined) {
          this.articles = articles;
        } else {
          this.articles = this.articles.concat(articles);
        }
      },
      (err: HttpErrorResponse) => this.errorHandling(err)
    );
  }

  errorHandling(err): void {
    if (err.error instanceof Error) {
      console.log('error: ' + err.error.message);
    } else {
      console.log('error: ' + err.status + ', detail: ' + err.error);
    }
  }
}
