import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AngularFireService {
  private isLoggedIn: boolean = false;

  constructor(private fireAuth: AngularFireAuth) { }

  public signUp(email: string, password: string): Promise<boolean> {
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then(
      value => {
        this.isLoggedIn = true;
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
        this.isLoggedIn = true;
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

  public isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
