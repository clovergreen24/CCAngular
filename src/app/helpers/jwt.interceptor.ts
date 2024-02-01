import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../service/authentication.service';
import * as jwt_decode from 'jwt-decode';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // agrego Authorization Header con jwt token si esta disponible
        let currentUser = localStorage.getItem("currentUser");
        
        const authReq= request.clone({
            headers: request.headers.set(
                'Authorization',
                'Bearer ' + (localStorage.getItem("currentUser") || '')
            ),
        });
        return next.handle(authReq);
    }
}