import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent  {

  constructor( private router: Router,
               private authService: AuthService) { }

  // tslint:disable-next-line:typedef
  login() {
    this.authService.login().subscribe( (resp: any) => {
      console.log(resp);

      if ( resp.id ){
        this.router.navigate(['./heroes']);
      }
    });
  }

  ingresarSinLogin(): any{
    this.authService.logout();
    this.router.navigate(['./heroes']);
  }

}
