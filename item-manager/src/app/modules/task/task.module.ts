import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './components/list/list.component';
import { ReadComponent } from './components/read/read.component';
import { SaveComponent } from './components/save/save.component';
import { TaskRoutingModule } from './task-routing.module';

@NgModule({
    declarations: [
        SaveComponent, 
        ListComponent, 
        ReadComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        TaskRoutingModule
    ]
})
export class TaskModule {}