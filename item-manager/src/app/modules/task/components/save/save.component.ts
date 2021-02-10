import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseForm } from 'src/app/modules/shared/components/base-form/base-form.component';
import { Collections } from 'src/app/modules/shared/models/collections.model';
import { MessageOption } from 'src/app/modules/shared/models/messages.model';
import { AngularFireService } from 'src/app/modules/shared/services/auth.service';
import { MessageService } from 'src/app/modules/shared/services/message.service';
import { TaskService } from '../../services/task.service';
import { TaskModel } from '../../task.model';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent extends BaseForm implements OnInit {
  private userId: string;
  public task: TaskModel;
  private readonly taskId: string = null;

  constructor(
    private firestore: AngularFirestore,
    private afService: AngularFireService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService)
    {
      super(afService);
      this.taskId = this.activatedRoute.snapshot.paramMap.get('id');
      this.task = this.taskService.getEmptyTaskObject();
    }

  ngOnInit(): void {
    this.afService.getUserId().then(
      (uid: string) => {
        this.userId = uid;
        if (this.taskId === null) {
          this.initializeForm();
        } else {
          this.taskService.getTaskObject(this.userId);
        }
      }
    )
  }

  private initializeForm() {
    this.theForm = new FormGroup({
      name: new FormControl(
          this.task.name,
          [
              Validators.required
          ]
      ),
      subtasks: new FormArray(
        this.task.subtasks.map(data => new FormControl(data))
      )
    });
    this.formLoaded = true;
  }

  public addNewSubtask() {
    const subtasks = this.theForm.get('subtasks') as FormArray;
    subtasks.push(new FormControl('', [Validators.required]));
    this.task.subtasks.push('');
  }

  onSubmit() {
    const formData = this.theForm.value;
    console.log('Form data: ', formData);
    this.taskService.getTaskPath(this.userId).add(formData).then(
      (response: any) => {
        this.messageService.displayMessage('Success adding to firestore', MessageOption.SUCCESS);
      },
      (error: any) => {
        this.messageService.displayMessage('Fail adding to firestore', MessageOption.ERROR);
      }
    )
  }

  protected apiRequest(formData: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  protected handleSuccess(response: any): void {
    throw new Error('Method not implemented.');
  }
  protected handleError(response: any): void {
    throw new Error('Method not implemented.');
  }
}
