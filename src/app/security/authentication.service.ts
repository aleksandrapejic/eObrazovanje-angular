import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { JwtUtilsService } from './jwt-utils.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';
import { Http } from '@angular/http';


@Injectable()
export class AuthenticationService {

  private readonly loginPath = 'http://localhost:8080/oauth/token'

  constructor(private http: HttpClient, private jwtUtilsService: JwtUtilsService, private inj: Injector) { }

  login(username: string, password: string): Observable<boolean> {
    let http:Http = this.inj.get(Http);
    var headers = new Headers();
    headers.set("Authorization", 'Basic ' + btoa('trusted-app:secret'));
    headers.set("Content-Type", "application/x-www-form-urlencoded");
    return http.post(this.loginPath, "username="+username+"&password="+password+"&grant_type=password", {headers: headers}).map((res:any) => { 
        res = res.json();
        let token = res.access_token;
        if (token) {
          localStorage.setItem('currentUser', JSON.stringify({ 
                                    username: username, 
                                    roles:this.jwtUtilsService.getRoles(token), 
                                    token: token 
                                  }));
          return true;
        }
        else {
          return false;
        }
      })
      .catch((error: any) => {
        if (error.status === 400) {
          return Observable.throw('Illegal login');
        }
        else {
          console.log(error)
          return Observable.throw('');
        }
      });
  }

  getToken(): String {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    return token ? 'Bearer ' + token : "";
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean{
    if(this.getToken()!='') return true;
    else return false;
  }

  getCurrentUser(){
    if(localStorage.currentUser){
      return JSON.parse(localStorage.currentUser);
    }
    else{
      return undefined;
    }
  }
}
