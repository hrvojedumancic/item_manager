import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { rejects } from 'assert';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Collections } from '../models/collections.model';
import { MessageOption } from '../models/messages.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AngularFireService {

  constructor(private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore, 
    private messageService: MessageService
    ) 
  { }

  public signUp(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.fireAuth.createUserWithEmailAndPassword(email, password).then(
        response => {
          this.firestore.collection(Collections.USERS).doc(response.user.uid).set({
            testDoc: 'TestDocValue'
          });
          console.log('Log in response value: ', response);
          this.messageService.displayMessage('Registration successful');
          return resolve(true);
        },
        error => {
          this.messageService.displayMessage('Unsuccessful app sign up', MessageOption.ERROR);
          return reject(false);
        }
      )
    });
  }

  public signIn(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.fireAuth.signInWithEmailAndPassword(email, password).then(
        response => {
          this.messageService.displayMessage('Login successful');
          return resolve(true);
        },
        error => {
          this.messageService.displayMessage('Unsuccessful app sign in', MessageOption.ERROR);
          return reject(false);
        }
      )
    });
  }

  public googleSignIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
        response => {
          this.messageService.displayMessage('Google login successful');
          return resolve(true);
        },
        error => {
          this.messageService.displayMessage('Successful app Google sign in', MessageOption.ERROR);
          return reject(false);
        }
      )
    });
  }

  public signOut(): Promise<void> {
    return this.fireAuth.signOut();
  }

  public isUserLoggedIn(): Promise<boolean> {
    return new Promise((resolve) => {
      this.fireAuth.authState.subscribe(
        response => {
          if (response !== null) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      )
    });
  }

  public getUserId(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.fireAuth.authState.subscribe(
        response => {
          if (response !== null) {
            resolve(response.uid);
          } else {
            reject(null);
          }
        }
      )
    });
  }
}
