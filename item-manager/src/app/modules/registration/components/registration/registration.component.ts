import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireService } from 'src/app/modules/shared/services/auth.service';
import { RegistrationForm } from '../../services/registration-form.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends RegistrationForm implements OnInit {

  constructor(private afService: AngularFireService,
    private router: Router) {
    super(afService);
  }

  ngOnInit(): void {
    this.initializeRegistrationForm();
  }

  public initializeRegistrationForm(): void {
    this.theForm = new FormGroup({
      email: new FormControl(
        'Email needed reg',
        [Validators.required]
      ),
      password: new FormControl(
        'Password needed reg',
        [Validators.required]
      )
    });
  }

  onSubmit(): Promise<boolean> {
    super.onSubmit().then(
      value => {
        if (value) {
          console.log('Registration success');
          this.router.navigate(['/']);
        } else {
          console.log('Registration not a success');
        }
        return Promise.resolve(value);
      }
    )
    return Promise.resolve(null);
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
