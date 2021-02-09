import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AngularFireService {
  public signedIn: Observable<any>;

  constructor(private fireAuth: AngularFireAuth) {
    this.signedIn = new Observable((subscriber) => {
      this.fireAuth.onAuthStateChanged(subscriber);
  });
  }

  public signUp(email: string, password: string): Promise<boolean> {
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then(
      value => {
        console.log('Signed up to firebase. Response: ', value);
        return Promise.resolve(true);
      },
      error => {
        console.log('Sign up is not successful', error);
        return Promise.resolve(false);
      }
    )
  }

  public signIn(email: string, password: string): Promise<boolean> {
    return this.fireAuth.signInWithEmailAndPassword(email, password).then(
      value => {
        console.log('Signed in to firebase. Response: ', value);
        return Promise.resolve(true);
      },
      error => {
        console.log(error);
        return Promise.resolve(false);
      }
    )
  }

  public googleSignIn(): Promise<boolean> {
    return this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      value => {
        console.log('Sign in with google (success): ', value);
        return Promise.resolve(true);
      },
      error => {
        console.log('Sign in with google (fail): ', error);
        return Promise.resolve(false);
      }
    );
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
