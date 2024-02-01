import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from  '../../environments/environment';

import { Usuario } from '../model/usuario.interface';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Usuario | null>;
    public currentUser: Observable<Usuario | null>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Usuario | null>(JSON.parse(localStorage.getItem('currentUser')|| '{}'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Usuario | null { //te devuelve el user logeado
        return this.currentUserSubject.value;
    }

    login(username: string | null, password: string | null) {
        return this.http.post<any>(`${env.url}/auth`, { username, password })
            .pipe(map(credentials => {
                // login successful si hay un token en la respuesta
                if (credentials && credentials.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(credentials));
                    this.currentUserSubject.next(credentials);
                }
                
                return credentials;
            }));
    }

    logout() {
        // elimino las credenciales del localstorage al deslogearme
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}