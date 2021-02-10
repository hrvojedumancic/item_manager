import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFireService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private afService: AngularFireService,
    private router: Router) { }

  ngOnInit(): void {
  }

  public signOut() {
    this.afService.signOut().then(
      value => {
        this.router.navigate(['/login']);
      }
    );
  }
}
