import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService,
               private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verificaAutenticacion()
        .pipe(
          tap( estaAutenticado => {
            if (!estaAutenticado){
              this.router.navigate(['./auth/login']);
            }
          })
        );

      // if (this.authService.auth.id){
      //   return true;
      // }

      // console.log('Bloqueado por el AuthGuard - Can Activate');
      // return false;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verificaAutenticacion()
        .pipe(
          tap( estaAutenticado => {
            if (!estaAutenticado){
              this.router.navigate(['./auth/login']);
            }
          })
        );

      // Por medio del método que realizamos en el authService, en el guard se esta
      // verificando sí el usuario esta autenticado, y en caso no estarlo, este nos
      // regresa a una página anterior.

      // if (this.authService.auth.id){
      //   return true;
      // }

      // console.log('Bloqueado por el AuthGuard - Can Load');
      // return false;
  }
}


// CAN LOAD: Funciona para activar modulos

// Los guards no ayudan a implementar reglas de validaciòn para las rutas,
// de tal manera que podemos proteger la aplicacion

// Cuando en el return se coloca el valor boleano "true" es que el usuario
// podra acceder a cualquier ruta, no importando que este no este autenticado
// por otro lado sí se coloca "false" el usuario debera estar autenticado para
// continuar visualizando las demás páginas.
