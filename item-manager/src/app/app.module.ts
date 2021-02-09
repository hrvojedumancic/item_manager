import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirstComponentComponent } from './first-component/first-component.component';
import { LoginModule } from './modules/login/login.module';
import { RegistrationModule } from './modules/registration/registration.module';
import { SharedModule } from './modules/shared/shared.module';
import { ListComponent } from './modules/task/list/list.component';
import { ReadComponent } from './modules/task/read/read.component';
import { SaveComponent } from './modules/task/save/save.component';
import { TaskModule } from './modules/task/task.module';


@NgModule({
  declarations: [
    AppComponent,
    FirstComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    RegistrationModule,
    BrowserAnimationsModule,
    SharedModule,
    TaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
