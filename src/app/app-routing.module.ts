import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './components/article/list/article-list.component';
import { ArticleDetailComponent } from './components/article/detail/article-detail.component';
import { EditComponent } from './components/article/edit/edit.component';

const routes: Routes = [
  {path: '', component: ArticleListComponent},
  {path: 'a/:id', component: ArticleDetailComponent},
  {path: 'e/:id', component: EditComponent},
  {path: 'e/new', component: EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
