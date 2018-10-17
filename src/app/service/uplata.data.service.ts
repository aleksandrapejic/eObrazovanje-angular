import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UplataDataService {

  constructor(public http:HttpClient) { }

  getUplate(){
    return this.http.get('http://localhost:8080/api/uplate').map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getUplata( id: number){
    return this.http.get('http://localhost:8080/api/uplate/' + id).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getUplateByStudentId( id: number, page = 0, size = 0){
    return this.http.get('http://localhost:8080/api/studenti/' + id + '/uplate?page='+page+'&size='+size, {observe: 'response'}).map((res:any) => {
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

  addUplata(uplata){
    return this.http.post('http://localhost:8080/api/uplate/', uplata).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  deleteUplata(id){
    return this.http.delete('http://localhost:8080/api/uplate/' + id).map((res:any) => res)
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
