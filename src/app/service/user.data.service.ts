import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, ResponseContentType, RequestOptions, RequestMethod} from '@angular/http';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserDataService {

  public loggedInId;
  public loggedInRole;
  
  constructor(public http:HttpClient) { }

  getUsers(){
    return this.http.get('http://localhost:8080/api/users').map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getAdmini(){
    return this.http.get('http://localhost:8080/api/admin').map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getStudenti(page = 0, size = 0, ime = "", prezime = ""){
    return this.http.get('http://localhost:8080/api/studenti?size='+size+'&page='+page+'&ime='+ime+'&prezime='+prezime, {observe: 'response'}).map((res:any) => {
    return res;
    }).catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getNastavnici(page = 0, size = 0, ime = "", prezime = ""){
    return this.http.get('http://localhost:8080/api/nastavnik?size='+size+'&page='+page+'&ime='+ime+'&prezime='+prezime, {observe: 'response'}).map((res:any) => {
      return res;
    }).catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getUser( id: number){
    return this.http.get('http://localhost:8080/api/users/' + id).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getDokumentiByStudentId(id: number){
    return this.http.get('http://localhost:8080/api/studenti/' + id + "/dokumenti" ).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  addUser(user){
    var userType = "";
    if (user.role =="ADMINISTRATOR") userType = "admin";
    else if (user.role =="NASTAVNIK") userType = "nastavnik";
    else userType = "studenti";
    return this.http.post('http://localhost:8080/api/'+ userType, user).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  updateUser(id, user){
    var userType = "";
    if (user.role =="ADMINISTRATOR") userType = "admin";
    else if (user.role =="NASTAVNIK") userType = "nastavnik";
    else userType = "studenti";
    return this.http.put('http://localhost:8080/api/'+ userType +'/'+id, user).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  changePhoneNumber(id, user){
   
    return this.http.put('http://localhost:8080/api/studenti/'+ id + '/broj-telefona', user).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  
  changeSubscriptionTelegramBot(id, user){
   
    return this.http.put('http://localhost:8080/api/studenti/'+ id + '/telegram-prijava', user).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  deleteUser(id){
    return this.http.delete('http://localhost:8080/api/users/' + id).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  deleteAdmin(id){
    return this.http.delete('http://localhost:8080/api/admin/' + id).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  deleteStudent(id){
    return this.http.delete('http://localhost:8080/api/studenti/' + id).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  deleteNastavnik(id){
    return this.http.delete('http://localhost:8080/api/nastavnik/' + id).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }


  getByUsername(username: String){
    return this.http.get('http://localhost:8080/api/users/user/'+ username).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  checkForUsername(username){
    return this.http.get('http://localhost:8080/api/users/username-check?username='+username).map((res:any) => {
        res.status
    }).catch((error : any) => {
        return Observable.throw(error);
    })
  }

  updatePassword(oldPass, newPass){
    var body = {oldPassword:oldPass,newPassword:newPass};
    return this.http.put('http://localhost:8080/api/users/password',body).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      if (error.status === 400) {
        return Observable.throw("Failed to change password (old password doesn't match)!");
      }
    });
  }

  getPolozeniPredmeti(id:any){
    return this.http.get('http://localhost:8080/api/studenti/' + id + "/polozeni-ispiti" ).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }
  
  getNepolozeniPredmeti(id: any){
    return this.http.get('http://localhost:8080/api/studenti/' + id + "/nepolozeni-ispiti" ).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }
}
