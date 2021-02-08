import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseForm } from 'src/app/modules/shared/components/base-form/base-form.component';
import { AngularFireService } from 'src/app/modules/shared/services/auth.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseForm implements OnInit {

  constructor(private afService: AngularFireService,
    private router: Router) {
    super(afService);
  }
  
  ngOnInit(): void {
    this.initializeLoginForm();
  }

  public initializeLoginForm(user?: UserModel): void {
    this.theForm = new FormGroup({
      email: new FormControl(
        user ? user.email : 'admin@admin.test',
        [Validators.required]
      ),
      password: new FormControl(
        user ? user.password : 'abc123',
        [Validators.required]
      )
    });
  }

  onSignIn(): Promise<boolean> {
    super.onSignIn().then(
      value => {
        if (value) {
          this.router.navigate(['home']).then();
        } else {
          console.log('Login is unssucessful');
        }
        return Promise.resolve(value);
      }
    );
    return Promise.resolve(null);
  }

  protected apiRequest(formData: any): Observable<any> {
    console.log('Api request form data: ', formData);
    throw new Error('Method not implemented.');
  }
  protected handleSuccess(response: any): void {
    throw new Error('Method not implemented.');
  }
  protected handleError(response: any): void {
    throw new Error('Method not implemented.');
  }

  public redirectToRegistration() {
    this.router.navigate(['registration']);
  }
}
