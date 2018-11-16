import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MarkdownService } from 'ngx-markdown';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../models/article';
import { EditViewMode } from '../../../dictionary/misc';

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
  private editMode: number;

  constructor(private md: MarkdownService, private fb: FormBuilder, private route: ActivatedRoute, private apiService: ArticleService) {
  }

  ngOnInit() {
    this.setMarkdownPreviewUpdate();
    this.initForm();
    this.route.url.subscribe(segments => {
      if (segments[1]) {
        const path = segments[1].path;
        if (path === 'new') {
          this.setNewMode();
        } else if (this.regxId.test(path)) {
          this.id = Number(path);
          this.setEditMode();
        }
      }
    });
  }

  triggerUpdate() {
    this.updatePreviewTriggerSub$.next(true);
  }

  submit() {
    const article = new Article();
    article.id = this.id;
    article.content = this.mdContent;
    article.brief = this.articleForm.value.brief;
    article.active = this.isArticleActivated ? 1 : 0;
    article.title = this.articleForm.value.title;
    if (this.editMode === EditViewMode.EDIT) {
      this.apiService.putArticle(article).subscribe(result => {
        console.log(result);
      });
    } else {
      this.apiService.postArticle(article).subscribe(result => {
        console.log(result);
      });
    }
  }

  changeActive(slide) {
    this.isArticleActivated = slide.checked;
  }

  private setNewMode() {
    this.editMode = EditViewMode.NEW;
  }

  private setEditMode() {
    this.editMode = EditViewMode.EDIT;
    this.apiService.getArticle(this.id).subscribe((article: Article) => {
      this.articleForm.patchValue(
        {'title': article.title, 'brief': article.brief, 'content': article.content});
      this.mdContent = article.content;
      this.isArticleActivated = article.active === 1;
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
