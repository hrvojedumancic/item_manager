import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseForm } from 'src/app/modules/shared/components/base-form/base-form.component';
import { AngularFireService } from 'src/app/modules/shared/services/auth.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends BaseForm implements OnInit {

  constructor(private afService: AngularFireService,
    private router: Router) {
    super(afService);
  }

  ngOnInit(): void {
    this.initializeRegistrationForm();
  }

  public initializeRegistrationForm(user?: UserModel): void {
    this.theForm = new FormGroup({
      email: new FormControl(
        user ? user.email : 'Email needed reg',
        [Validators.required]
      ),
      password: new FormControl(
        user ? user.password : 'Password needed reg',
        [Validators.required]
      )
    });
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

  public redirectToLogin() {
    this.router.navigate(['']);
  }

}
