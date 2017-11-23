import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  constructor() { }

  public artile;

  ngOnInit() {
  }

  fetchArtile() {
  }

}
