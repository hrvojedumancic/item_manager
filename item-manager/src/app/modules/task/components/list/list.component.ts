import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFireService } from '../../../shared/services/auth.service';
import { TaskModel } from '../../task.model';
import { TaskService } from '../../services/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DocumentData } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

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
    private taskService: TaskService) { }

  ngAfterViewInit(): void {
    this.afService.getUserId().then(
      (uid: string) => {
        this.userId = uid;
        this.getUserTaskCollection();
      }
    )
  }

  ngOnDestroy() {
    this.taskSubscription.unsubscribe();
  }

  public getUserTaskCollection() {
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
      }
    )
  }

  public deleteTask(taskId: string) {
    this.taskService.deleteTask(this.userId, taskId).then(
      (response: boolean) => {
        if (response) {
          this.tasks = this.tasks.filter(x => x.id !== taskId);
          this.bindData();
        }
      }
    );
  }

  public updateTaskStatus(task: TaskModel, taskCompleted: boolean) {
    const formData = {
      completed: taskCompleted
    };
    this.taskService.updateTask(this.userId, task.id, formData).then(
      (response: boolean) => {
        const taskIndex = this.tasks.indexOf(task);
        this.tasks[taskIndex].completed = taskCompleted;
        this.bindData();
      }
    )
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
