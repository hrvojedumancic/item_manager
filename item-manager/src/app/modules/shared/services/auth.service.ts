import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AngularFireService {
  private currectUser: Observable<any>;

  constructor(private fireAuth: AngularFireAuth) { }

  public signUp(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(
      value => {
        console.log('Signed up to firebase. Response: ', value);
      }
    )
  }

  public signIn(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(
      value => {
        console.log('Signed in to firebase. Response: ', value);
      }
    )
  }

  public getUser(): Observable<any> {
    return this.fireAuth.user;
  }
}
