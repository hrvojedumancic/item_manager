import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginFormService {

  constructor() { }

  public initializeLoginForm(user?: UserModel): Observable<FormGroup> {
    let loginForm = new FormGroup({
      email: new FormControl(
        user ? user.email : 'Email needed',
        []
      ),
      password: new FormControl(
        user ? user.password : 'Password needed',
        []
      )
    });
    return of(loginForm);
  }
}
