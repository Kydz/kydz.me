import { Component, OnInit } from '@angular/core';

import { Article } from '../../../models/article';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { ArticleService } from '../../../services/article.service';
import { BrowserBehaviorService } from '../../../services/browser-behavior.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})

export class ArticleListComponent implements OnInit {
  public articles: Array<Article>;

  constructor(
    private articleService: ArticleService,
    private bb: BrowserBehaviorService
  ) {
  }

  ngOnInit(): void {
    this.fetchArticles(this.articleService.getStart());
  }

  loadPreviousPage(): void {
    this.articleService.setStart(++this.articleService.currentStart);
    this.fetchArticles(this.articleService.currentStart);
    this.bb.scrollTop();
  }

  loadNextPage(): void {
    this.articleService.setStart(--this.articleService.currentStart);
    this.fetchArticles(this.articleService.currentStart);
    this.bb.scrollTop();
  }

  isInStart(): boolean {
    return this.articleService.currentStart === 0;
  }

  hasOrderContent() {
    return this.articleService.hasPreviousArticles;
  }


  errorHandling(err): void {
    if (err.error instanceof Error) {
      console.log('error: ' + err.error.message);
    } else {
      console.log('error: ' + err.status + ', detail: ' + err.error);
    }
  }

  private fetchArticles(start: number): void {
    this.articleService.getArticleList(start).subscribe(
      articles => {
        this.articles = articles;
        this.articleService.setStart(start);
      },
      (err: HttpErrorResponse) => this.errorHandling(err)
    );
  }
}
