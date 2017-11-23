import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap, retry } from 'rxjs/operators';
import 'rxjs/add/operator/retry';

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
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(): void {
    this.http.get<Article[]>(this.apiUrl)
    .pipe(
      catchError(this.handleError('fetchArticles', []))
    ).subscribe(
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

  handleError<T>(operation, result ?: T) {
    return (error: any): Observable<T> => {
      return Observable.throw(error);
    };
  }
}
