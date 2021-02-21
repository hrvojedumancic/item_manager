import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AngularFireService } from 'src/app/modules/shared/services/auth.service';
import { TaskService } from '../../services/task.service';
import { TaskModel } from '../../task.model';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit, OnDestroy {
  private userId: string = null;
  private readonly taskId: string = null;
  private taskSubscription: Subscription;
  public task: TaskModel = null;

  constructor(private afService: AngularFireService,
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router) 
    {
      this.taskId = this.activatedRoute.snapshot.paramMap.get('id');  
    }

  ngOnInit(): void {
    this.afService.getUserId().then(
      (response: string) => {
        this.userId = response;
        this.getTask();
      }
    )
  }

  ngOnDestroy() {
    this.taskSubscription.unsubscribe();
  }

  public getTask() {
    this.taskSubscription = this.taskService.
      getTaskDocument(this.userId, this.taskId).valueChanges().subscribe(
        (response: TaskModel) => {
          this.task = response;
        },
        (error) => {
          this.router.navigate(['/']);
        }
    )
  }

}
