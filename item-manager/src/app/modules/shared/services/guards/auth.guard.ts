import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afService: AngularFireService) { }

  canActivate(): boolean {
    return this.afService.getIsUserLoggedIn();
  }
  
}
