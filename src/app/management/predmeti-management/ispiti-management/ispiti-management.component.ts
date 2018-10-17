import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IspitDataService } from '../../../service/ispit.data.service'
import { PredmetDataService } from '../../../service/predmet.data.service';
import { DatePipe } from '@angular/common';
import { ErrorDialogComponent } from '../../../dialog/error-dialog/error-dialog.component';

@Component({
  selector: 'app-ispiti-management',
  templateUrl: './ispiti-management.component.html',
  styleUrls: ['./ispiti-management.component.css']
})
export class IspitiManagementComponent implements OnInit {


  @Input() predmetId:any;
  currentIspit = { id:"", predmet:" ", nastavnik:"",datum: "" ,rokZaPrijavu:"", usmeniUkupnoBodova:"", usmeniMinimumBodova:""};
  ispiti : any[] = [];
  deleteId:number;
  deleteName:string;
  isUpdate: boolean;
  firstDate= new Date();
  touched = false;
  predmetNastavnici= [];
  datePipe = new DatePipe("en-US");
  activePage: number = 1;
  size: number = 5;
  pageCount = [];
  @ViewChild(ErrorDialogComponent) child: ErrorDialogComponent; 

  
  constructor(public ispitService: IspitDataService, public predmetService: PredmetDataService) { 
  }

  ngOnInit() {
    this.getIspiti();
  }

  changePage(page) {
    this.activePage = page;
    this.getIspiti();
  }

  getIspiti(){
    this.currentIspit.predmet = this.predmetId;
    this.predmetService.getNastavnici(this.predmetId).subscribe(res => this.predmetNastavnici = res);
    this.ispitService.getIspitByPredmetId(this.predmetId, this.activePage-1, this.size).subscribe(res => {
      this.pageCount = Array(parseInt(res.headers.get("total"))).fill(0).map((x,i)=>i);
      if (this.pageCount.length == 0){
        this.pageCount.push(0);
      }
      this.ispiti = res.body;
      this.ispiti.forEach(element => {
        element.datum = this.datePipe.transform(element.datum,"yyyy-MM-dd");
        element.rokZaPrijavu = this.datePipe.transform(element.rokZaPrijavu,"yyyy-MM-dd");
      });
    }, error =>{
      this.child.showModal(error);
    })
  }

  deleteIspit(id){
    this.deleteId = id;
  }
  
  deleteConfirm(){
    var deleteIndex: number;
    this.ispitService.deleteIspit(this.deleteId).subscribe(res => {
    this.ispiti.forEach((element, index) => {
        if (this.deleteId == element.id){
          deleteIndex = index;
        }
      });
    this.ispiti.splice(deleteIndex,1);
    if (this.ispiti.length == 0){
      if (this.activePage!=1){
        this.activePage = this.activePage - 1;
        }
        this.getIspiti();
    }else{
      if (this.activePage < this.pageCount.length){
        this.getIspiti();
      }
      }
    }, error =>{
      this.child.showModal(error);
    })
  }
  
  saveConfirm(){
   if (!this.isUpdate){
      this.create();
      }else{
      this.update();
    }
  }
  
  reset(){
    this.currentIspit.id="";
    this.currentIspit.nastavnik="";
    this.currentIspit.datum="";
    this.currentIspit.usmeniUkupnoBodova="";
    this.currentIspit.usmeniMinimumBodova="";
    this.currentIspit.rokZaPrijavu="";
  }

  addIspit(){
    this.isUpdate = false;
    this.reset();
  }
  
  create(){
    this.ispitService.addIspit(this.predmetId, this.currentIspit).subscribe(res => {
      res.datum = this.datePipe.transform(res.datum,"yyyy-MM-dd");
      res.rokZaPrijavu = this.datePipe.transform(res.rokZaPrijavu,"yyyy-MM-dd");
      this.ispiti.push(res);
    }, error =>{
      this.child.showModal(error);
    })
  }
  
  update(){
    this.ispitService.updateIspit(this.currentIspit.id, this.currentIspit).subscribe(x => {
      x.datum = this.datePipe.transform(x.datum,"yyyy-MM-dd");
      x.rokZaPrijavu = this.datePipe.transform(x.rokZaPrijavu,"yyyy-MM-dd");
      for (let i =0; i<this.ispiti.length; i++){
        if (this.ispiti[i].id == x.id){
          this.ispiti[i] = x;
      }
    }
  }, error =>{
    this.child.showModal(error);
  })
  }
  
  editIspit(ispit){
    this.isUpdate = true;
    this.currentIspit.id = ispit.id;
    this.currentIspit.rokZaPrijavu = ispit.rokZaPrijavu;
    this.currentIspit.datum = ispit.datum;
    this.currentIspit.usmeniMinimumBodova = ispit.usmeniMinimumBodova;
    this.currentIspit.usmeniUkupnoBodova = ispit.usmeniUkupnoBodova;
    this.currentIspit.nastavnik = ispit.nastavnik.id;
  }

  change(event){
    if (!this.touched) this.touched = true;
  }


  
  
}
