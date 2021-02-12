import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadButtonComponent } from './components/read-button/read-button.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { EditButtonComponent } from './components/edit-button/edit-button.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ReadButtonComponent,
    EditButtonComponent,
    DeleteButtonComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    ReadButtonComponent,
    EditButtonComponent,
    DeleteButtonComponent
  ]
})
export class ButtonsModule { }
