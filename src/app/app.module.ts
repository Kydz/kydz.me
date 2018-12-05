import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ArticleListComponent } from './components/article/list/article-list.component';
import { ArticleDetailComponent } from './components/article/detail/article-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditComponent } from './components/kitchen/edit/edit.component';
import { MarkdownModule } from 'ngx-markdown';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { LeftSideComponent } from './components/left-side/left-side.component';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/kitchen/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftSideComponent,
    ArticleListComponent,
    ArticleDetailComponent,
    EditComponent,
    KitchenComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MarkdownModule.forRoot(),
    ToastrModule.forRoot(),
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
