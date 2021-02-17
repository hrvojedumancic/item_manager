import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireService } from 'src/app/modules/shared/services/auth.service';
import firebase from 'firebase/app';
import { MessageService } from 'src/app/modules/shared/services/message.service';
import { MessageOption } from 'src/app/modules/shared/models/messages.model';
import { BaseForm } from 'src/app/modules/shared/services/base-form/base-form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseForm implements OnInit {

  constructor(private afService: AngularFireService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService) {
    super(afService);
  }
  
  ngOnInit(): void {
    this.initializeLoginForm();
  }

  public initializeLoginForm() {
    this.theForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.formLoaded = true;
  }

  public onGoogleSubmit() {
    this.angularFireService.googleSignIn().then(
      (response: firebase.auth.UserCredential) => {
        if (response) {
          if (response !== null) {
            this.router.navigate(['/']).then();
          }
        }
      },
      error => {
        this.messageService.displayMessage(error.message, MessageOption.ERROR);
      }
    );
  }

  public onSubmit() {
    const formData = this.theForm.value;
    this.angularFireService.signIn(formData.email, formData.password).then(
      (response: firebase.auth.UserCredential) => {
        this.router.navigate(['/']).then();
      },
      error => {
        this.messageService.displayMessage(error.message, MessageOption.ERROR);
      }
    );
  }

  public redirectToRegistration() {
    this.router.navigate(['/registration']);
  }
}
