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
    this.afService.isUserLoggedIn().then(
      value => {
        if (value) {
          this.router.navigate(['/']);
        } else {
          this.initializeLoginForm();    
        }
      }
    )
  }

  public initializeLoginForm() {
    this.theForm = new FormGroup({
      email: new FormControl(
        '',
        [Validators.required]
      ),
      password: new FormControl(
        '',
        [Validators.required]
      )
    });
    this.formLoaded = true;
  }

  public onGoogleSubmit(): Promise<boolean> {
    return new Promise((resolve) => {
      super.onGoogleSubmit().then(
        (response: boolean) => {
          if (response) {
            this.router.navigate(['/']).then();
          } else {
            console.log('Login is unssucessful');
          }
          return resolve(response);
        }
      );
    });
  }

  public onSubmit(): Promise<boolean> {
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

  public redirectToRegistration() {
    this.router.navigate(['/registration']);
  }
}
