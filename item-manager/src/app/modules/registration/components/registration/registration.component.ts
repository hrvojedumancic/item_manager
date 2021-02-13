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
    this.afService.isUserLoggedIn().then(
      value => {
        if (value) {
          this.router.navigate(['/']);
        } else {
          this.initializeRegistrationForm();
        }
      }
    )
  }

  public initializeRegistrationForm() {
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
    this.formLoaded = true;
  }

  public onSubmit(): Promise<boolean> {
    return new Promise((resolve) => {
      super.onSubmit().then(
        (response: boolean) => {
          if (response) {
            this.router.navigate(['/']).then();
          } else {
            console.log('Registration not a success');
          }
          return resolve(response);
        });
    }
    )
  }

  public onGoogleSubmit(): Promise<boolean> {
    return super.onGoogleSubmit().then(
      (response: boolean) => {
        if (response) {
          this.router.navigate(['/']).then();
        } else {
          console.log('Registration with google is unssucessful');
        }
        return Promise.resolve(response);
      }
    );
  }

  public redirectToLogin() {
    this.router.navigate(['']);
  }

}
