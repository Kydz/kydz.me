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
  public articles;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(): void {
    this.http.get<Article[]>(this.apiUrl)
    .subscribe(
      articles => this.articles = articles,
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('error: ' + err.error.message);
        } else {
          console.log('error: ' + err.status + ', detail: ' + err.error);
        }
      }
    );
  }
}
