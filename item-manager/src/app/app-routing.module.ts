import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './modules/shared/components/navigation/navigation.component';
import { PageNotFoundComponent } from './modules/shared/components/page-not-found/page-not-found.component';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectLoggedInToMain = () => redirectLoggedInTo(['/']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./modules/task/task.module').
      then(m => m.TaskModule)
  },
  {
    path: '',
    ...canActivate(redirectLoggedInToMain),
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
