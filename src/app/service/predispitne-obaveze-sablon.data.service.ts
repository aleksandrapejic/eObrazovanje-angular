import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PredispitneObavezeSablonDataService {

  constructor(public http:HttpClient) { }

  getSabloni(){
    return this.http.get('http://localhost:8080/api/predispitne-obaveze/sabloni').map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getSablon( id: number){
    return this.http.get('http://localhost:8080/api/predispitne-obaveze/sabloni/' + id).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getSabloniByPredmetId( id: number){
    return this.http.get('http://localhost:8080/api/predmeti/' + id + '/predispitne-obaveze-sabloni').map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  addSablon(sablon){
    return this.http.post('http://localhost:8080/api/predispitne-obaveze/sabloni', sablon).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  updateSablon(id,sablon){
    return this.http.put('http://localhost:8080/api/predispitne-obaveze/sabloni/'+id, sablon).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  deleteSablon(id){
    return this.http.delete('http://localhost:8080/predispitne-obaveze/sabloni/' + id).map((res:any) => res)
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
