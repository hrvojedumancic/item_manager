import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireService } from 'src/app/modules/shared/services/auth.service';
import { TaskService } from '../../services/task.service';
import { TaskModel } from '../../task.model';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {
  private userId: string = null;
  private readonly taskId: string = null;
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
        this.getUserObject();
      }
    )
  }

  public getUserObject() {
    this.taskService.getTaskObject(this.userId, this.taskId).then(
      (response: TaskModel) => {
        this.task = response;
      },
      (error: any) => {
        this.router.navigate(['/']);
      }
    )
  }

}
