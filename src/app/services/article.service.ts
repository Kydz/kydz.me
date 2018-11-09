import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Article } from '../models/article';

const CURRENT_START = 'current-start';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  currentStart = 0;
  hasOrderContent = true;

  private readonly endpoint = 'http://localhost:8088/';
  private readonly limit = 12;

  constructor(private http: HttpClient) {
  }

  getStart() {
    let start = 0;
    if (this.currentStart) {
      start = this.currentStart;
    } else {
      const cachedStart = Number(localStorage.getItem(CURRENT_START));
      if (cachedStart) {
        this.currentStart = start = cachedStart;
      }
    }
    return start;
  }

  setStart(start: number) {
    this.currentStart = start;
    localStorage.setItem(CURRENT_START, start.toString());
  }

  getArticleList(start = 1): Observable<Article[]> {
    const offset = start * this.limit;
    return this.http.get <Article[]>(this.endpoint + `article?o=${ offset }&l=${ this.limit }`).pipe(
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
