import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authStatus: boolean;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authStatus = this.authService.isAuth;
  }
  // tslint:disable-next-line: typedef
  onSignIn() {
    this.authService.signIn().then(
      () => {
      // console.log('connexion réussie !');
        this.authStatus = this.authService.isAuth;
        //on redirige au moment de la connection à la route appareils
        this.router.navigate(['appareils']);
      }
    );
  }
  // tslint:disable-next-line: typedef
  onSignOut() {
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
  }
}
