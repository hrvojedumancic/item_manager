import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponentComponent } from './first-component/first-component.component';
import { NavigationComponent } from './modules/shared/components/navigation/navigation.component';
import { AuthGuard } from './modules/shared/services/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: NavigationComponent,
    canActivate: [AuthGuard],
    children: [
      { 
        path: '',
        component: FirstComponentComponent
      }
    ]
  },
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').
      then(m => m.AuthModule)
  },
  {
    path: 'login',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
