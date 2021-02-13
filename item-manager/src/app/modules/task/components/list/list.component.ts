import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
import { Collections } from '../../../shared/models/collections.model';
import { AngularFireService } from '../../../shared/services/auth.service';
import { TaskModel } from '../../task.model';
import { map } from 'rxjs/operators';
import { TaskService } from '../../services/task.service';
import { TaskModule } from '../../task.module';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public formLoaded: boolean = false;
  public tasks: TaskModel[] = [];
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

  constructor(private firestore: AngularFirestore,
    private afService: AngularFireService,
    private taskService: TaskService) { }

  ngOnInit(): void {
    this.afService.getUserId().then(
      (uid: string) => {
        this.userId = uid;
        this.getUserTaskCollection();
      }
    )
  }

  public getUserTaskCollection() {
    this.taskService.getUserTaskCollection(this.userId).then(
      (response: TaskModel[]) => {
        this.tasks = response;
        this.formLoaded = true;
      }
    )
  }

  public deleteTask(taskId: string) {
    this.taskService.deleteTask(this.userId, taskId).then(
      (response: boolean) => {
        if (response) {
          this.tasks = this.tasks.filter(x => x.id !== taskId);
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
      },
      (error: any) => {

      }
    )
  }
}
