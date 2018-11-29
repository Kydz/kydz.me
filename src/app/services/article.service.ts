import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Article } from '../models/article';
import { environment } from '../../environments/environment';

const CURRENT_START = 'current-start';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  currentStart = 0;
  hasPreviousArticles = true;

  private readonly endpoint = environment.api;

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

  getArticleList(start = 1, limit = 6): Observable<Article[]> {
    const offset = start * limit;
    return this.http.get(this.endpoint + `article?o=${offset}&l=${limit}`).pipe(
      catchError(this.handleError),
      map((data: any) => {
        this.hasPreviousArticles = data.total > (offset + limit) && data.total !== offset + limit;
        return data.rows;
      })
    );
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(this.endpoint + `article/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  putArticle(article: Article): Observable<any> {
    return this.http.put(this.endpoint + `article/${article.id}`, article).pipe(
      catchError(this.handleError)
    );
  }

  postArticle(article: Article): Observable<any> {
    return this.http.post(this.endpoint + `article`, article).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error) {
    console.error(error);
    return throwError(error);
  }
}
