import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseForm } from 'src/app/modules/shared/services/base-form/base-form.service';
import { MessageOption } from 'src/app/modules/shared/models/messages.model';
import { AngularFireService } from 'src/app/modules/shared/services/auth.service';
import { MessageService } from 'src/app/modules/shared/services/message.service';
import { TaskService } from '../../services/task.service';
import { TaskModel } from '../../task.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent extends BaseForm implements OnInit, OnDestroy {
  private userId: string;
  public task: TaskModel;
  private taskSubscription: Subscription = null;
  private readonly taskId: string = null;

  constructor(
    private afService: AngularFireService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private formBuilder: FormBuilder)
    {
      super(afService);
      this.taskId = this.activatedRoute.snapshot.paramMap.get('id');
      this.task = this.taskService.getEmptyTask();
    }

  ngOnInit(): void {
    this.afService.getUserId().then(
      (uid: string) => {
        this.userId = uid;
        if (this.taskId === null) {
          this.initializeForm();
          return;
        }
        this.getTask();
      }
    )
  }

  ngOnDestroy() {
    if (this.taskSubscription !== null) {
      this.taskSubscription.unsubscribe();
    }
  }

  private initializeForm() {
    this.theForm = this.formBuilder.group({
      name: [this.task.name, Validators.required],
      description: [this.task.description, Validators.required]
    });
    if (this.task !== null) {
      this.theForm.addControl('completed', new FormControl(this.task.completed));
    }
    this.formLoaded = true;
  }

  public getTask() {
    this.taskSubscription = this.taskService.
      getTaskDocument(this.userId, this.taskId).valueChanges().subscribe(
        (response: TaskModel) => {
          this.task = response;
          this.task.id = this.taskId;
          this.initializeForm();
        },
        (error) => {
          this.messageService.displayMessage('Error while getting task object', MessageOption.OK);
        }
    )
  }

  public onSubmit() {
    if (this.taskId === null) {
      this.createTask();
      return;
    }
    this.updateTask();
  }

  private updateTask() {
    try {
      const formData = this.theForm.value;
      this.taskService.getTaskDocument(this.userId, this.taskId).update(formData);
      this.messageService.displayMessage('Task updated', MessageOption.SUCCESS);
        this.router.navigate(['/']);
    } catch(error) {
      this.messageService.displayMessage('Failed updating task', MessageOption.OK);
    }
  }

  private createTask() {
    try {
      const formData = this.theForm.value;
      formData.created_at = (new Date().toISOString());
      formData.completed = false;
      this.taskService.getTaskPath(this.userId).add(formData);
      this.messageService.displayMessage('Task created', MessageOption.SUCCESS);
      this.router.navigate(['/']);
    } catch(error) {
      this.messageService.displayMessage('Failed creating task', MessageOption.OK);
    }
  }
}
