import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseForm } from 'src/app/modules/shared/components/base-form/base-form.component';
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
    private afService: AngularFireService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private router: Router)
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
          this.getTaskObject();
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
      description: new FormControl(
          this.task.description,
          [
            Validators.required
          ]
      ),
      subtasks: new FormArray(
        this.task.subtasks.map(data => new FormControl(data))
      )
    });
    if (this.task !== null) {
      this.theForm.addControl('completed', new FormControl(this.task.completed));
    }
    this.formLoaded = true;
  }

  public addNewSubtask() {
    const subtasks = this.theForm.get('subtasks') as FormArray;
    subtasks.push(new FormControl('', [Validators.required]));
    this.task.subtasks.push('');
  }

  public getTaskObject() {
    this.taskService.getTaskObject(this.userId, this.taskId).then(
      (response: TaskModel) => {
        this.task = response;
        this.task.id = this.taskId;
        this.initializeForm();
      },
      (error: any) => {
        this.messageService.displayMessage('Error while getting task object', MessageOption.OK);
      }
    )
  }

  public onSubmit() {
    if (this.taskId === null) {
      this.createTaskObject();
    } else {
      this.updateTaskObject();
    }
  }

  private updateTaskObject() {
    const formData = this.theForm.value;
    this.taskService.updateTask(this.userId, this.taskId, formData).then(
      (response: boolean) => {
        this.messageService.displayMessage('Task updated', MessageOption.SUCCESS);
        this.router.navigate(['/']);
      },
      (error: any) => {
        this.messageService.displayMessage('Failed updating task', MessageOption.OK);
      }
    );
  }

  private createTaskObject() {
    const formData = this.theForm.value;
    formData.created_at = (new Date().toISOString());
    formData.completed = false;
    this.taskService.getTaskPath(this.userId).add(formData).then(
      (response: any) => {
        this.messageService.displayMessage('Task created', MessageOption.SUCCESS);
        this.router.navigate(['/']);
      },
      (error: any) => {
        this.messageService.displayMessage('Failed creating task', MessageOption.OK);
      }
    )
  }
}
