import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SideBarComponent } from "./side-bar.component";
import { ArticleListComponent } from "./article-list.component";

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    ArticleListComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
