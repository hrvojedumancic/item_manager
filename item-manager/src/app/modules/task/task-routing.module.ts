import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { ReadComponent } from './components/read/read.component';
import { SaveComponent } from './components/save/save.component';

const routes: Routes = [
    {
        path: '',
        component: ListComponent
    },
    {
        path: 'new',
        component: SaveComponent
    },
    {
        path: 'edit/:id',
        component: SaveComponent,
        pathMatch: 'full'
    },
    {
        path: 'read/:id',
        component: ReadComponent,
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class TaskRoutingModule {}