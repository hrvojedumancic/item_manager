import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { MessageOption } from '../models/messages.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AngularFireService {
  public signedIn: Observable<any>;

  constructor(private fireAuth: AngularFireAuth, private messageService: MessageService) {
    this.signedIn = new Observable((subscriber) => {
      this.fireAuth.onAuthStateChanged(subscriber);
  });
  }

  public signUp(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.fireAuth.createUserWithEmailAndPassword(email, password).then(
        value => {
          this.messageService.displayMessage('Successful app sign up', MessageOption.SUCCESS);
          return resolve(true);
        },
        error => {
          this.messageService.displayMessage('Unsuccessful app sign up', MessageOption.ERROR);
          return resolve(false);
        }
      )
    });
  }

  public signIn(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.fireAuth.signInWithEmailAndPassword(email, password).then(
        value => {
          this.messageService.displayMessage('Successful app sign in', MessageOption.SUCCESS);
          return resolve(true);
        },
        error => {
          this.messageService.displayMessage('Unsuccessful app sign in', MessageOption.ERROR);
          return resolve(false);
        }
      )
    });
  }

  public googleSignIn(): Promise<boolean> {
    return new Promise((resolve) => {
      this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
        value => {
          this.messageService.displayMessage('Successful app Google sign in', MessageOption.SUCCESS);
          return resolve(true);
        },
        error => {
          this.messageService.displayMessage('Successful app Google sign in', MessageOption.ERROR);
          return resolve(false);
        }
      )
    });
  }

  public signOut(): Promise<void> {
    return this.fireAuth.signOut();
  }

  public async isUserLoggedIn(): Promise<boolean> {
    return new Promise((resolve) => {
      this.signedIn.subscribe(
        value => {
          if (value !== null) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      )
    });
  }
}
