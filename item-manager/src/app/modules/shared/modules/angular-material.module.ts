import { NgModule } from "@angular/core";
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    imports: [
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatIconModule,
        MatTableModule,
        MatCheckboxModule
    ],
    exports: [
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatIconModule,
        MatTableModule,
        MatCheckboxModule
    ]
})
export class AngularMaterialModule {}