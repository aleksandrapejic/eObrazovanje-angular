import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class IspitDataService {

  constructor(public http:HttpClient) { }

  getIspiti(){
    return this.http.get('http://localhost:8080/api/ispit').map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getIspit( id: number){
    return this.http.get('http://localhost:8080/api/ispit/' + id).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getIspitByPredmetId( id: number, page = 0, size = 0){
    return this.http.get('http://localhost:8080/api/predmeti/' + id + '/ispiti?page='+page+'&size='+size, {observe: 'response'}).map((res:any) => {
      return res;
      }
    ).catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getIspitByPredmetIdandNastavnikId( id: number, nastavnikId: any){
   console.log(nastavnikId) 
    return this.http.get('http://localhost:8080/api/predmeti/' + id + '/ispiti?nastavnik='+nastavnikId).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  addIspit(predmetId , ispit){
    return this.http.post('http://localhost:8080/api/predmeti/' + predmetId + '/ispiti', ispit).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  deleteIspit(id){
    return this.http.delete('http://localhost:8080/api/ispit/' + id).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  updateIspit(id, ispit){
    return this.http.put('http://localhost:8080/api/ispit/'+id, ispit).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }


  getIspitiZaPrijavu(id: number){
    return this.http.get('http://localhost:8080/api/studenti/' + id + "/prijava-ispita" ).map((res:any) => res)
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
