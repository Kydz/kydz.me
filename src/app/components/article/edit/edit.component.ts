import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MarkdownService } from 'ngx-markdown';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../models/article';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  mdContent = '';
  articleForm: FormGroup;
  isArticleActivated = false;

  private id = 0;
  private updatePreviewTriggerSub$ = new Subject();
  private regxId = new RegExp('\\d+');

  constructor(private md: MarkdownService, private fb: FormBuilder, private route: ActivatedRoute, private apiService: ArticleService) {
  }

  ngOnInit() {
    this.setMarkdownPreviewUpdate();
    this.initForm();
    this.route.url.subscribe(segments => {
      if (segments[1]) {
        const path = segments[1].path;
        if (path === 'new') {
          this.newMode();
        } else if (this.regxId.test(path)) {
          this.id = Number(path);
          this.editMode();
        }
      }
    });
  }

  triggerUpdate() {
    this.updatePreviewTriggerSub$.next(true);
  }

  submit() {
    const article = new Article();
    article.Id = this.id;
    article.Content = this.mdContent;
    article.Brief = this.articleForm.value.brief;
    article.Active = this.isArticleActivated ? 1 : 0;
    this.apiService.putArticle(article).subscribe(console.log);
  }

  private newMode() {

  }

  private editMode() {
    this.apiService.getArticle(this.id).subscribe((article: Article) => {
      this.articleForm.patchValue(
        {'title': article.Title, 'brief': article.Brief, 'content': article.Content});
      this.mdContent = article.Content;
      this.isArticleActivated = article.Active === 1;
    });
  }

  private setMarkdownPreviewUpdate() {
    this.updatePreviewTriggerSub$.pipe(
      debounceTime(1000)
    ).subscribe(_ => {
      this.mdContent = this.articleForm.value.content;
    });
  }

  private initForm() {
    this.articleForm = this.fb.group({
      'title': [],
      'brief': [],
      'content': []
    });

  }
}
