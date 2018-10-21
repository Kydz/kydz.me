import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly endpoint = 'http://localhost:8088/';
  private readonly perPage = 18;

  constructor(private http: HttpClient) {
  }

  getArticleList(page = 1): Observable<Article[]> {
    return this.http.get <Article[]>(this.endpoint + `article?perpage=${ this.perPage }&page=${ page }`).pipe(
      catchError(this.handleError)
    );
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(this.endpoint + `article/${ id }`).pipe(
      catchError(this.handleError)
    );
  }

  putArticle(article: Article): Observable<any> {
    return this.http.put(this.endpoint + `article/${ article.Id }`, article).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error) {
    return throwError(error);
  }
}
