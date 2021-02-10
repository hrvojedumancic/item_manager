import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Collections } from '../../../shared/models/collections.model';
import { AngularFireService } from '../../../shared/services/auth.service';
import { TaskModel } from '../../task.model';
import { map } from 'rxjs/operators';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public tasks: TaskModel[] = [];
  private userId: string;
  private readonly taskId: string = null;

  constructor(private firestore: AngularFirestore,
    private afService: AngularFireService,
    private taskService: TaskService) { }

  ngOnInit(): void {
    this.afService.getUserId().then(
      (uid: string) => {
        this.userId = uid;
        if (this.taskId === null) {
          this.getUserTasks();
        } else {
          this.taskService.getTaskObject(this.userId);
        }
      }
    )
  }

  getUserTasks() {
    this.afService.getUserId().then(
      (uid: string) => {
        console.log(uid);
        this.getUserTaskCollection();
      }
    )
  }

  public getUserTaskCollection() {
    this.taskService.getTaskPath(this.userId).valueChanges().subscribe(
      value => {
        console.log(value);
      }
    );
  }

  public getUserTaskSubtasks(uid: string, taskId: string) {
    this.firestore
    .collection(Collections.USERS)
    .doc(uid)
    .collection(Collections.TASKS).doc();
  }

}
