import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
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
          this.messageService.displayMessage();
          console.log('Signed up to firebase. Response: ', value);
          return resolve(true);
        },
        error => {
          console.log('Sign up is not successful', error);
          return resolve(false);
        }
      )
    });
  }

  public signIn(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.fireAuth.signInWithEmailAndPassword(email, password).then(
        value => {
          this.messageService.displayMessage();
          console.log('Signed in to firebase. Response: ', value);
          return resolve(true);
        },
        error => {
          console.log(error);
          return resolve(false);
        }
      )
    });
  }

  public googleSignIn(): Promise<boolean> {
    return new Promise((resolve) => {
      this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
        value => {
          console.log('Sign in with google (success): ', value);
          return resolve(true);
        },
        error => {
          console.log('Sign in with google (fail): ', error);
          return resolve(false);
        }
      )
    });
  }

  public signOut() {
    this.fireAuth.signOut();
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
