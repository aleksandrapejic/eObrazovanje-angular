import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DokumentDataService {

  constructor(public http:HttpClient) { }

  getDokuments(){
    return this.http.get('http://localhost:8080/api/dokument').map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getDokument( id: number){
    return this.http.get('http://localhost:8080/api/dokument/' + id).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getDokumentsByStudentId( id: number, page = 0, size = 0, naziv = ""){
    return this.http.get('http://localhost:8080/api/studenti/' + id + '/dokumenti?page='+page+'&size='+size+'&naziv='+naziv,{observe: 'response'}).map((res:any) => {
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

  addDokument(studentId, dokument){
    const formData = new FormData();
    formData.set("naziv", dokument.naziv);
    formData.set("dokument", dokument.sadrzaj);
    return this.http.post('http://localhost:8080/api/studenti/' + studentId + '/dokumenti', formData).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  deleteDokument(id){
    return this.http.delete('http://localhost:8080/api/dokument/' + id).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  updateDokument(id, dokument){
    return this.http.put('http://localhost:8080/api/dokument/'+id, dokument).map((res:any) => res)
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
