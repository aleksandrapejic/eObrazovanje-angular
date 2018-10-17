import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PredispitneObavezeDataService {

  constructor(public http:HttpClient) { }

  getPredispitneObaveze(){
    return this.http.get('http://localhost:8080/api/predispitne-obaveze').map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getPredispitnaObaveza( id: number){
    return this.http.get('http://localhost:8080/api/predispitne-obaveze/' + id).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getPredispitneObavezeByPredmetId( id: number){
    return this.http.get('http://localhost:8080/api/predmeti/' + id + '/predispitne-obaveze').map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getPredispitneObavezeByStudentId( id: number){
    return this.http.get('http://localhost:8080/api/studenti/' + id + '/predispitne-obaveze').map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getPredispitneObavezeByStudentIdandPredmetId( studentId: number, predmetId: number){
    return this.http.get('http://localhost:8080/api/studenti/' + studentId + '/predispitne-obaveze?predmet='+predmetId).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getPredispitneObavezeByNastavnikId( id: number){
    return this.http.get('http://localhost:8080/api/nastavnik/' + id + '/predispitne-obaveze').map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getPredispitneObavezeBySablonId( id: number){
    return this.http.get('http://localhost:8080/api/predispitne-obaveze/sabloni/' + id + '/polaganja').map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  addPredispitnaObaveza(predispitnaObaveza){
    return this.http.post('http://localhost:8080/api/predispitne-obaveze', predispitnaObaveza).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  deletePredispitnaObaveza(id){
    return this.http.delete('http://localhost:8080/predispitne-obaveze/' + id).map((res:any) => res)
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
