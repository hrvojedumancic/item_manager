import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginFormService } from '../../services/login-form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private loginFormService: LoginFormService) {
    this.loginFormService.initializeLoginForm().subscribe(
      (value: FormGroup) => {
        this.loginForm = value;
        console.log(this.loginForm);
      }
    )
  }

  ngOnInit(): void {
  }

}
