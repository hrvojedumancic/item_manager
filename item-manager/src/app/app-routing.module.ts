import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponentComponent } from './first-component/first-component.component';
import { NavigationComponent } from './modules/shared/components/navigation/navigation.component';
import { AuthGuard } from './modules/shared/services/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
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
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').
      then(m => m.LoginModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./modules/registration/registration.module').
      then(m => m.RegistrationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
