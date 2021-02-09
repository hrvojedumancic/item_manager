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
    if (this.afService.isUserLoggedIn()) {
      this.router.navigate(['/']);
    } else {
      this.initializeRegistrationForm().then(
        value => {
          this.formLoaded = true;
        }
      );
    }
  }

  public initializeRegistrationForm(): Promise<boolean> {
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
    return Promise.resolve(true);
  }

  onSubmit(): Promise<boolean> {
    return super.onSubmit().then(
      (response: boolean) => {
        if (response) {
          console.log('Registration success');
          this.router.navigate(['/']).then();
        } else {
          console.log('Registration not a success');
        }
        return Promise.resolve(response);
      }
    )
  }

  public onGoogleSubmit(): Promise<boolean> {
    return super.onGoogleSubmit().then(
      (response: boolean) => {
        if (response) {
          console.log('Registration with google success');
          this.router.navigate(['/']).then();
        } else {
          console.log('Registration with google is unssucessful');
        }
        return Promise.resolve(response);
      }
    );
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
