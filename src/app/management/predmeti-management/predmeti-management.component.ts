import { Component, OnInit, Input,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PredmetDataService } from '../../service/predmet.data.service';
import { UserDataService } from '../../service/user.data.service';
import { DualListComponent } from 'angular-dual-listbox';
import { ErrorDialogComponent } from '../../dialog/error-dialog/error-dialog.component';

@Component({
  selector: 'app-predmeti-management',
  templateUrl: './predmeti-management.component.html',
  styleUrls: ['./predmeti-management.component.css']
})
export class PredmetiManagementComponent implements OnInit {

  predmeti:any[] = [];
  nastavnici = [];
  currentPredmet = { id:"", naziv:"", oznaka:"",espb:""};
  deleteName: any;
  deleteId: number;
  isUpdate: boolean;
  valid:boolean = true;
  oznakaOriginal: string;
  sourceStudent = [];
  sourceNastavnik = [];
  destinationNastavnik = [];
  destinationStudent = [];
  display = "ime";
  key = "id";
  activePage: number = 1;
  size: number = 5;
  filterNaziv: string;
  pageCount = [];
  @ViewChild(ErrorDialogComponent) child: ErrorDialogComponent; 

  constructor(public predmetiService: PredmetDataService, public userService: UserDataService, private router: Router ) {
      this.getPredmeti();
  }


  getPredmeti(){
    this.predmetiService.getPredmeti(this.activePage-1, this.size,this.filterNaziv).subscribe(res => {
      this.predmeti = res.body;
      this.predmeti.forEach(element => {
        element.showIspiti = false;
        element.showSabloni = false;
      });
      this.pageCount = Array(parseInt(res.headers.get("total"))).fill(0).map((x,i)=>i);
      if (this.pageCount.length == 0){
        this.pageCount.push(0);
      }
    }, error =>{
      this.child.showModal(error);
    });

}


  ngOnInit() {


    this.userService.getStudenti().subscribe(res => {
      res.body.forEach(element => {
        this.sourceStudent.push({id:element.id, ime:element.brojIndexa + ": " +element.ime+" "+element.prezime});
      });
    }, error =>{
      this.child.showModal(error);
    });

    this.userService.getNastavnici().subscribe(res => {
      res.body.forEach(element => {
        this.sourceNastavnik.push({id:element.id, ime:element.ime+" "+element.prezime});
      });
    }, error =>{
      this.child.showModal(error);
    });
    
  }

  changePage(page) {
    this.activePage = page;
    this.getPredmeti();
  }

deletePredmet(id, naziv){
  this.deleteId = id;
  this.deleteName = naziv;
}

deleteConfirm(){
  var deleteIndex: number;
  this.predmetiService.deletePredmet(this.deleteId).subscribe(res => {
    this.predmeti.forEach((element, index) => {
      if (this.deleteId == element.id){
        deleteIndex = index;
      }
    });
    this.predmeti.splice(deleteIndex,1);
  if (this.predmeti.length == 0){
    if (this.activePage!=1){
      this.activePage = this.activePage - 1;
      }
      this.getPredmeti();
  }else{
    if (this.activePage < this.pageCount.length){
      this.getPredmeti();
    }
  }
  }, error =>{
    this.child.showModal(error);
  });
}

saveConfirm(){
    if (!this.isUpdate){
        this.save();
        }else{
        this.update();
        }
}

save(){
    this.predmetiService.addPredmet(this.currentPredmet).subscribe(x => {
      if (this.predmeti.length == this.size){
        this.pageCount.push(this.pageCount.length+1);
        this.changePage(this.pageCount.length);
    }
      this.predmeti.push(x);
    }, error =>{
      this.child.showModal(error);
    });
       
}

reset(){
  this.currentPredmet.naziv="";
  this.currentPredmet.oznaka="";
  this.currentPredmet.naziv="";
  this.oznakaOriginal="";
  this.valid=true;
}

addPredmet(){
  this.reset;
  this.isUpdate = false;
  
}

update(){
    this.predmetiService.updatePredmet(this.currentPredmet.id, this.currentPredmet).subscribe(x => {
    for (let i =0; i<this.predmeti.length; i++){
      if (this.predmeti[i].id == x.id){
        this.predmeti[i] = x;
      }
    }

  }, error =>{
    this.child.showModal(error);
  });

}

editPredmet(predmet){
  this.isUpdate = true;
  this.currentPredmet.id = predmet.id;
  this.currentPredmet.espb = predmet.espb;
  this.currentPredmet.naziv = predmet.naziv;
  this.currentPredmet.oznaka = predmet.oznaka;
  this.oznakaOriginal = predmet.oznaka;
}

showIspiti(id){
  this.predmeti.forEach(element => {
    if (element.id == id) element.showIspiti = !element.showIspiti;
  }, error =>{
    this.child.showModal(error);
  });
}

showSabloni(id){
  this.predmeti.forEach(element => {
    if (element.id == id) element.showSabloni = !element.showSabloni;
  }, error =>{
    this.child.showModal(error);
  });
}

checkOznaka(){
  this.valid = true;
  this.predmetiService.checkOznaka(this.currentPredmet.oznaka).subscribe((res)=>{
    if (this.currentPredmet.oznaka != this.oznakaOriginal || this.oznakaOriginal==""){
      this.valid=false;
      }  
    }, (err)=>{
      if (err.status == 302){
        if (this.currentPredmet.oznaka != this.oznakaOriginal || this.oznakaOriginal=="")
          this.valid=false;
      }
    })
  }

  getNastavnici(id){
    this.currentPredmet.id = id;
    this.destinationNastavnik = [];
    this.predmetiService.getNastavnici(id).subscribe(res => {
      res.forEach(element => {
        this.destinationNastavnik.push({id:element.id, ime:element.ime+" "+element.prezime});
      });
    }, error =>{
      this.child.showModal(error);
    });
  }

  saveNastavnici(){
    this.predmetiService.postNastavnici(this.currentPredmet.id, this.destinationNastavnik).subscribe();
  }

  getStudenti(id){
    this.destinationStudent = [];
    this.currentPredmet.id = id;
    this.predmetiService.getStudenti(id).subscribe(res => {
      res.forEach(element => {
        this.destinationStudent.push({id:element.id, ime:element.brojIndexa + ": " + element.ime+" "+element.prezime});
      });
    }, error =>{
      this.child.showModal(error);
    });
  }

  saveStudenti(){
    this.predmetiService.postStudenti(this.currentPredmet.id, this.destinationStudent).subscribe();
  }

}