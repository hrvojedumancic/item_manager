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

  public async onGoogleSubmit() {
    try {
      const response = await this.angularFireService.googleSignIn();
      this.router.navigate(['/']).then();
    } catch(error) {
      this.messageService.displayMessage(error.message, MessageOption.ERROR);
    }
  }

  public async onSubmit() {
    const formData = this.theForm.value;
    try {
      const response = await this.angularFireService.signIn(formData.email, formData.password);
      this.router.navigate(['/']).then();
    } catch(error) {
      this.messageService.displayMessage(error.message, MessageOption.ERROR);
    }
  }

  public redirectToRegistration() {
    this.router.navigate(['/registration']);
  }
}
