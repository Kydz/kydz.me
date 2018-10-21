import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['../article.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  public article;

  constructor(
    private apiService: ApiService,
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

}
