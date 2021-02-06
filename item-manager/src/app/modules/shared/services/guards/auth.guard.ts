import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AngularFireService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afService: AngularFireService) { }

  canActivate(): boolean {
    this.afService.getUser().subscribe(
      (user) => {
        if (user) {
          console.log('Currently loged in user: ', user);
          return true;
        } else {
          console.log('No user is logged in');
        }
      }
    )
    return false;
  }
  
}
