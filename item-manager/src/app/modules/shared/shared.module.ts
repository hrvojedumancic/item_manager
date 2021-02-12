import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './modules/angular-material.module';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReadButtonComponent } from './components/buttons/read-button/read-button.component';
import { EditButtonComponent } from './components/buttons/edit-button/edit-button.component';
import { DeleteButtonComponent } from './components/buttons/delete-button/delete-button.component';

@NgModule({
  declarations: [
    NavigationComponent,
    PageNotFoundComponent,
    ReadButtonComponent,
    EditButtonComponent,
    DeleteButtonComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    RouterModule
  ],
  exports: [
    AngularMaterialModule,
    ReadButtonComponent,
    EditButtonComponent,
    DeleteButtonComponent
  ]
})
export class SharedModule { }
