import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
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

  public async signUp(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return await this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  public async signIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return await this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  public async googleSignIn(): Promise<firebase.auth.UserCredential> {
    return await this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
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
