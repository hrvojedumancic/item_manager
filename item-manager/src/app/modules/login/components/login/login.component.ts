import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireService } from 'src/app/modules/shared/services/auth.service';
import { LoginForm } from '../../services/login-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends LoginForm implements OnInit {

  constructor(private afService: AngularFireService,
    private router: Router) {
    super(afService);
  }
  
  ngOnInit(): void {
    this.initializeLoginForm();
  }

  public initializeLoginForm(): void {
    this.theForm = new FormGroup({
      email: new FormControl(
        'admin@admin.test',
        [Validators.required]
      ),
      password: new FormControl(
        'abc123',
        [Validators.required]
      )
    });
  }

  public onGoogleSubmit(): Promise<boolean> {
    return super.onGoogleSubmit().then(
      (response: boolean) => {
        if (response) {
          this.router.navigate(['/']).then();
        } else {
          console.log('Login is unssucessful');
        }
        return Promise.resolve(response);
      }
    );
  }

  onSubmit(): Promise<boolean> {
    return super.onSubmit().then(
      (response: boolean) => {
        if (response) {
          this.router.navigate(['/']).then();
        } else {
          console.log('Login is unssucessful');
        }
        return Promise.resolve(response);
      }
    );
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
