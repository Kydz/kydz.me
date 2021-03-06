import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { ArticleService } from '../../../services/article.service';
import { BrowserBehaviorService } from '../../../services/browser-behavior.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  public article;

  constructor(
    private apiService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.fetchArticle(id);
  }

  fetchArticle(id) {
    this.apiService.getArticle(id).subscribe(
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

  toTop() {
    BrowserBehaviorService.scrollTop();
  }
}
