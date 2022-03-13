import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private usuario: Auth | undefined;

  // tslint:disable-next-line:typedef
  get auth(): Auth{
    // tslint:disable-next-line:no-non-null-assertion
    return {...this.usuario!};
  }

  constructor( private http: HttpClient) { }

  // Metodo que funciona para observar sí existe un token de autenticacion
  // del usuario.
  verificaAutenticacion(): Observable<boolean>{
    if (!localStorage.getItem('token')){
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map(auth => {
          this.usuario = auth;
          return true;
        })
      );
  }

  login(): any {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap(auth => this.usuario = auth),
        tap(auth => localStorage.setItem('token', auth.id ))
        );
  }

  logout(): any{
    this.usuario = undefined;
  }
}

// Se usan pipes en los servicios para evitar destruir otros
// eventos que podrìan estar en otros componentes

// Mientras que el tap es utilizado para generar eventos
// secundarios
