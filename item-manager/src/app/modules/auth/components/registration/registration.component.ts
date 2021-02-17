import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireService } from 'src/app/modules/shared/services/auth.service';
import firebase from 'firebase/app';
import { MessageService } from 'src/app/modules/shared/services/message.service';
import { BaseForm } from 'src/app/modules/shared/services/base-form/base-form.service';
import { MessageOption } from 'src/app/modules/shared/models/messages.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends BaseForm implements OnInit {

  constructor(private afService: AngularFireService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService) {
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

  public onSubmit() {
    const formData = this.theForm.value;
    this.angularFireService.signUp(formData.email, formData.password).then(
      (response: firebase.auth.UserCredential) => {
        this.router.navigate(['/']).then();
      },
      error => {
        this.messageService.displayMessage(error.message, MessageOption.ERROR);
      }
    );
  }

  public onGoogleSubmit() {
    this.angularFireService.googleSignIn().then(
      (response: firebase.auth.UserCredential) => {
        if (response) {
          this.router.navigate(['/']).then();
        }
      },
      error => {
        this.messageService.displayMessage(error.message, MessageOption.ERROR);
      }
    );
  }

  public redirectToLogin() {
    this.router.navigate(['']);
  }

}
