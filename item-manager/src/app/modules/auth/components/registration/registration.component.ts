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

  public async onSubmit() {
    const formData = this.theForm.value;
    try {
      await this.angularFireService.signUp(formData.email, formData.password);
      this.router.navigate(['/']).then();  
    } catch(error) {
      this.messageService.displayMessage(error.message, MessageOption.ERROR);
    }
  }

  public async onGoogleSubmit() {
    try {
      await this.angularFireService.googleSignIn();
      this.router.navigate(['/']).then();  
    } catch(error) {
      this.messageService.displayMessage(error.message, MessageOption.ERROR);
    }
  }

  public redirectToLogin() {
    this.router.navigate(['/']);
  }

}
