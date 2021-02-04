import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AngularFireModule } from '@angular/fire';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularFireModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
