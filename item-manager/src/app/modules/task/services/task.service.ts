import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Collections } from '../../shared/models/collections.model';
import { TaskModel } from '../task.model';

@Injectable({
    providedIn:'root'
})
export class TaskService {

    constructor(private firestore: AngularFirestore) {}

    public getEmptyTaskObject(): TaskModel {
        const task: TaskModel = {
            created_at: null,
            deleted_at: null,
            updated_at: null,
            name: null,
            subtasks: []
        }
        return task;
    }

    public getTaskPath(userId: string) {
        return this.firestore
        .collection(Collections.USERS)
        .doc(userId)
        .collection(Collections.TASKS);
    }

    public getTaskObject(userId: string) {
        this.firestore.collection(Collections.USERS)
          .doc(userId)
          .collection(Collections.TASKS)
          .doc().get().subscribe(
            value => {
              console.log(value);
            }
          ) 
      }

}