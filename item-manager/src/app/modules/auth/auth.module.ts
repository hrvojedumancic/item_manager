import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../shared/modules/angular-material.module';
import { LoginComponent } from '../auth/components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationComponent } from './components/registration/registration.component';

@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        AngularMaterialModule
    ]
})
export class AuthModule {}