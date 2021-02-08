import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../shared/modules/angular-material.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationRoutingModule } from './registration-routing.module';

@NgModule({
    declarations: [
        RegistrationComponent
    ],
    imports: [
        CommonModule,
        RegistrationRoutingModule,
        AngularMaterialModule
    ]
})
export class RegistrationModule {}