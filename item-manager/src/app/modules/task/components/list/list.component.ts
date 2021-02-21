import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { AngularFireService } from '../../../shared/services/auth.service';
import { TaskModel } from '../../task.model';
import { TaskService } from '../../services/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DocumentData } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/modules/shared/services/message.service';
import { MessageOption } from 'src/app/modules/shared/models/messages.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit, OnDestroy {
  public formLoaded: boolean = false;
  public tasks: TaskModel[] = [];
  private taskSubscription: Subscription;
  public dataSource: MatTableDataSource<TaskModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private userId: string;
  public readonly MAX_CHAR_LENGTH = 15;
  public displayedColumns: string[] = 
  [
    'name',
    'description',
    'created_at',
    'completed',
    'actions'
  ];

  constructor(private afService: AngularFireService,
    private taskService: TaskService,
    private messageService: MessageService) { }

  ngAfterViewInit(): void {
    this.afService.getUserId().then(
      (uid: string) => {
        this.userId = uid;
        this.getTaskCollection();
      }
    )
  }

  ngOnDestroy() {
    this.taskSubscription.unsubscribe();
  }

  public getTaskCollection() {
    this.taskSubscription = this.taskService.getTaskPath(this.userId).snapshotChanges().subscribe(
      (response: DocumentData[]) => {
        this.tasks = [];
        response.forEach(element => {
          let document = element.payload.doc;
          let task = document.data() as TaskModel;
          task.id = document.id;
          this.tasks.push(task);
        });
        this.bindData();
        this.formLoaded = true;
      },
      (error) => {
        this.messageService.displayMessage('Error while getting tasks', MessageOption.ERROR);
      }
    )
  }

  public deleteTask(taskId: string) {
    try {
      this.taskService.getTaskDocument(this.userId, taskId).delete();
      this.messageService.displayMessage('Task deleted', MessageOption.OK);
    } catch(error) {
      this.messageService.displayMessage('Unable to delete task', MessageOption.ERROR);
    }
  }

  public updateTaskStatus(task: TaskModel, taskCompleted: boolean) {
    const formData = {
      completed: taskCompleted
    };
    try {
      this.taskService.getTaskDocument(this.userId, task.id).update(formData);
      this.messageService.displayMessage('Task updated', MessageOption.SUCCESS);
      this.bindData();
    } catch(error) {
      this.messageService.displayMessage('Unable to update task', MessageOption.ERROR);
    }
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private bindData() {
    this.dataSource = new MatTableDataSource(this.tasks);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
