import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afService: AngularFireService, 
    private router: Router) { }

  canActivate(): boolean {
    if (!this.afService.getIsUserLoggedIn()) {
      this.router.navigate(['login']);
    }
    return this.afService.getIsUserLoggedIn();
  }
  
}
