import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './article-list.component';
import { ArticleDetailComponent } from './article-detail.component';

const routes: Routes = [
  {path: '', component: ArticleListComponent},
  {path: 'a/:id', component: ArticleDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
