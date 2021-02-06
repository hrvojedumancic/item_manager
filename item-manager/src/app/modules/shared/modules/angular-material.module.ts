import { NgModule } from "@angular/core";
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    imports: [
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule
    ],
    exports: [
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule
    ]
})
export class AngularMaterialModule {}