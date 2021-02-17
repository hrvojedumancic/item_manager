import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireService } from 'src/app/modules/shared/services/auth.service';
import { RegistrationForm } from '../../services/registration-form.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends RegistrationForm implements OnInit {

  constructor(private afService: AngularFireService,
    private router: Router,
    private formBuilder: FormBuilder) {
    super(afService);
  }

  ngOnInit(): void {
    this.initializeRegistrationForm();
  }

  public initializeRegistrationForm() {
    this.theForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
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
          console.log('Registration with google is unsuccessful');
        }
        return Promise.resolve(response);
      }
    );
  }

  public redirectToLogin() {
    this.router.navigate(['']);
  }

}
