import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './components/article/list/article-list.component';
import { ArticleDetailComponent } from './components/article/detail/article-detail.component';
import { EditComponent } from './components/kitchen/edit/edit.component';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { LoginComponent } from './components/kitchen/login/login.component';

const routes: Routes = [
  {path: '', component: ArticleListComponent},
  {path: 'a/:id', component: ArticleDetailComponent},
  {path: 'kitchen', component: KitchenComponent},
  {path: 'kitchen/login', component: LoginComponent},
  {path: 'kitchen/:id', component: EditComponent},
  {path: 'kitchen/new', component: EditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
