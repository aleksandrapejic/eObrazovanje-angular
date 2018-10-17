import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PredmetDataService {

  constructor(public http:HttpClient) { }

  getPredmeti(page = 0, size = 0, naziv = ""){
    return this.http.get('http://localhost:8080/api/predmeti?size='+size+'&page='+page+'&naziv='+naziv, {observe: 'response'}).map((res:any) => {
      return res;
      });
  }

  getPredmet( id: number){
    return this.http.get('http://localhost:8080/api/predmeti/' + id).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getPredmetByStudentId( id: number){
    return this.http.get('http://localhost:8080/api/studenti/' + id + '/predmeti').map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getPredmetByNastavnikId( id: number){
    return this.http.get('http://localhost:8080/api/nastavnik/' + id + '/predmeti').map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getPolozeniPredmeti( studentId: number){
    return this.http.get('http://localhost:8080/api/studenti/' + studentId + '/polozeni-predmeti').map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getNepolozeniPredmeti( studentId: number){
    return this.http.get('http://localhost:8080/api/studenti/' + studentId + '/nepolozeni-predmeti').map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }


  getNastavnici( id: number){
    return this.http.get('http://localhost:8080/api/predmeti/' + id + '/nastavnici').map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  getStudenti( id: number){
    return this.http.get('http://localhost:8080/api/predmeti/' + id + '/studenti').map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  addPredmet(predmet){
    return this.http.post('http://localhost:8080/api/predmeti/', predmet).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  deletePredmet(id){
    return this.http.delete('http://localhost:8080/api/predmeti/' + id).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  updatePredmet(id, predmet){
    return this.http.put('http://localhost:8080/api/predmeti/'+id, predmet).map((res:any) => res)
    .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  postNastavnici(id, nastavnici){
    var arraySend = [];
    nastavnici.forEach(element => {
      arraySend.push(element.id);
    });
     return this.http.post('http://localhost:8080/api/predmeti/'+id+'/nastavnici', arraySend).map((res:any) => res)
     .catch((error: any) => {
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please log in!');
      }
      else {
        return Observable.throw('Something went wrong...');
      }
    });
  }

  checkOznaka(oznaka){
    return this.http.get('http://localhost:8080/api/predmeti/oznaka-check?oznaka='+oznaka).map((res:any) => {
        res.status
    }).catch((error : any) => {
        return Observable.throw(error);
    })
  }

  postStudenti(id, studenti){
    var arraySend = [];
    studenti.forEach(element => {
      arraySend.push(element.id);
    });
     return this.http.post('http://localhost:8080/api/predmeti/'+id+'/studenti', arraySend).map((res:any) => res)
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
