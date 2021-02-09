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
    console.log('Is user logged in: ', this.afService.isUserLoggedIn());
    if (!this.afService.isUserLoggedIn()) {
      this.router.navigate(['/login']);
    }
    return this.afService.isUserLoggedIn();
  }
  
}
