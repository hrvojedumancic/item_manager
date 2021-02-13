import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import { rejects } from 'assert';
import { Collections } from '../../shared/models/collections.model';
import { MessageOption } from '../../shared/models/messages.model';
import { MessageService } from '../../shared/services/message.service';
import { TaskModel } from '../task.model';

@Injectable({
    providedIn:'root'
})
export class TaskService {

    constructor(private firestore: AngularFirestore,
        private messageService: MessageService) {}

    public getEmptyTaskObject(): TaskModel {
        const task: TaskModel = {
            created_at: null,
            description: null,
            id: null,
            completed: false,
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

    public getTaskObject(userId: string, taskId: string): Promise<TaskModel> | null {
        return new Promise((resolve, reject) => {
            this.firestore.collection(Collections.USERS)
            .doc(userId)
            .collection(Collections.TASKS)
            .doc(taskId).valueChanges().subscribe(
                (response: TaskModel) => {
                    if (response !== null && response !== undefined) {
                        resolve(response);
                    } else {
                        this.messageService.displayMessage(
                            'Error while getting single task',
                            MessageOption.OK
                        );
                        reject(null);
                    }
                },
                (error: any) => {
                    this.messageService.displayMessage('Error while getting single task', MessageOption.OK);
                    reject(null);
                }
            )
        }); 
    }

    public deleteTask(userId: string, taskId: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.firestore.collection(Collections.USERS)
            .doc(userId)
            .collection(Collections.TASKS)
            .doc(taskId)
            .delete().then(
                (response: any) => {
                    this.messageService.displayMessage('Task deleted', MessageOption.SUCCESS);
                    resolve(true);
                },
                (error: any) => {
                    this.messageService.displayMessage('Unable to delete task', MessageOption.ERROR);
                    reject;
                }
            )
        })
    }

    public updateTask(userId: string, taskId: string, formData: any): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.firestore.collection(Collections.USERS)
            .doc(userId)
            .collection(Collections.TASKS)
            .doc(taskId)
            .update(formData).then(
                (response: any) => {
                    this.messageService.displayMessage('Task status updated', MessageOption.SUCCESS);
                    resolve(true);
                },
                (error: any) => {
                    this.messageService.displayMessage('Unable to update task status', MessageOption.ERROR);
                    reject;
                }
            )
        })
    }

    public getUserTaskCollection(userId: string): Promise<TaskModel[]> | null {
        return new Promise((resolve, reject) => {
            this.getTaskPath(userId).snapshotChanges().subscribe(
                (value: DocumentData[]) => {
                  const tasks: TaskModel[] = [];
                  value.forEach(element => {
                    let document = element.payload.doc;
                    let task = document.data() as TaskModel;
                    task.id = document.id;
                    tasks.push(task);
                  });
                  resolve(tasks);
                },
                (error: any) => {
                    console.log('Error while trying to fetch user task collection: ', error);
                    this.messageService.displayMessage('Unable to fetch tasks', MessageOption.OK);
                    reject(null);
                }
              );
        })
    }

}