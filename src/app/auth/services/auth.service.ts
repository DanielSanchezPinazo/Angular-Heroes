
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap, of, map, catchError,BehaviorSubject } from 'rxjs';

import { environments } from 'src/environments/environments';

import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl: string = environments.baseUrl;
  private user?: User;

// Juanpi
  // private tokenInLocalStorage = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  // private accessOrNot = new BehaviorSubject<boolean>(false);


  constructor(
    private http: HttpClient,
    // private router: Router
    ) {
      // this.checkAuthentication()
    }

  get currentUser(): User | undefined {

    if ( !this.user ) return undefined;

    return structuredClone( this.user ); // Desde la v.17 de JS es la forma de hacer una copia profunda
  }

  login( email: string, password: string ): Observable<User> {

    return this.http.get<User>( `${ this.baseUrl }/users/1` )
      .pipe(

        tap( user => this.user = user ),
        tap( user => localStorage.setItem( "token", "a3dc3sd4csd4.6g8ujyu.6a4sca" ))

      );
  }

  checkAuthentication(): Observable<boolean> {

    if ( !localStorage.getItem( "token" ) ) return of(false);

    const token: string | null = localStorage.getItem( "token" );

    return this.http.get<User>( `${ this.baseUrl }/users/1` )
      .pipe(
        tap( user => this.user = user ),
        map( user => !!user ), // ponemos una doble nagación para que devuelva un booleano true
        catchError( err => of(false) )
      );

      // Juanpi
  //      this.tokenInLocalStorage.pipe(map(token => {
  //       if(token == null){
  //       this.router.navigate(['/'])
  //     }else{
  //       this.router.navigate(['/'])
  // }}))

  }

  logout() {

    this.user = undefined;
    localStorage.clear();
    // Juanpi
    // this.tokenInLocalStorage.next(null)
    // this.router.navigateByUrl( "/auth" );

  }

}
