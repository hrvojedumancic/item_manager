import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './modules/shared/components/navigation/navigation.component';
import { PageNotFoundComponent } from './modules/shared/components/page-not-found/page-not-found.component';
import { AuthGuard } from './modules/shared/services/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/task/task.module').
      then(m => m.TaskModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').
      then(m => m.AuthModule)
  },
  { 
    path: '**',
    component: PageNotFoundComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
