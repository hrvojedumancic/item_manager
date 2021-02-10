import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';
import { ReadComponent } from './read/read.component';
import { SaveComponent } from './save/save.component';
import { TaskRoutingModule } from './task-routing.module';

@NgModule({
    declarations: [
        SaveComponent, 
        ListComponent, 
        ReadComponent,
    ],
    imports: [
        SharedModule,
        TaskRoutingModule
    ]
})
export class TaskModule {}