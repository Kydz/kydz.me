import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { DomSanitizer } from '@angular/platform-browser';

import { Article } from './article';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  public article;
  public renderHighlightScript;
  private apiUrl = 'http://localhost:8088/article/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
   }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.fetchArticle(id);
  }

  fetchArticle(id) {
    this.http.get<Article>(this.apiUrl + id)
    .subscribe(
      article => this.article = article,
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
