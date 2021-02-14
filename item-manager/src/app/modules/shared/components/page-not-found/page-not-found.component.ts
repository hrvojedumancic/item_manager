import { Component, OnInit } from '@angular/core';
import { AngularFireService } from '../../services/auth.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  public isUserLoggedIn: boolean = false;

  constructor(public afService: AngularFireService) {
    this.afService.isUserLoggedIn().then(
      (response: boolean) => {
        this.isUserLoggedIn = response;
      }
    )
  }

}
