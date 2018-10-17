import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PredispitneObavezeSablonDataService } from '../../../service/predispitne-obaveze-sablon.data.service';
import { PredmetDataService } from '../../../service/predmet.data.service';
import { ErrorDialogComponent } from '../../../dialog/error-dialog/error-dialog.component';

@Component({
  selector: 'app-predispitne-obaveze-sablon-management',
  templateUrl: './predispitne-obaveze-sablon-management.component.html',
  styleUrls: ['./predispitne-obaveze-sablon-management.component.css']
})
export class PredispitneObavezeSablonManagementComponent implements OnInit {

  @Input() predmetId:any;
  @Input() currentSablon = { id:"", ukupnoBodova:" ", minimumBodova:"", naziv: "" , predmet:""};
  sabloni = [];
  deleteId:number;
  deleteName:string;
  isUpdate: boolean;
  @ViewChild(ErrorDialogComponent) child: ErrorDialogComponent; 

  constructor(public sablonService: PredispitneObavezeSablonDataService, public predmetService: PredmetDataService) { 
  }

  ngOnInit() {
    this.currentSablon.predmet = this.predmetId;
    this.sablonService.getSabloniByPredmetId(this.predmetId).subscribe(res => this.sabloni = res); 
  }

  deleteSablon(sablon){
    this.deleteId = sablon.id;
    this.deleteName = sablon.naziv;
  }

  deleteConfirm(){
    var deleteIndex: number;
    this.sablonService.deleteSablon(this.deleteId).subscribe();
      this.sabloni.forEach((element, index) => {
        if (this.deleteId == element.id){
          deleteIndex = index;
        }
        this.sabloni.splice(deleteIndex,1);
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
    this.currentSablon.id="";
    this.currentSablon.naziv="";
    this.currentSablon.minimumBodova="";
    this.currentSablon.ukupnoBodova="";
  }

  addSablon(){
    this.isUpdate = false;
    this.reset();
  }

  create(){
    this.sablonService.addSablon(this.currentSablon).subscribe(res => {
      this.sabloni.push(res);
    }, error =>{
      this.child.showModal(error);
    })
  }

  update(){
    this.sablonService.updateSablon(this.currentSablon.id, this.currentSablon).subscribe(x => {
      for (let i =0; i<this.sabloni.length; i++){
        if (this.sabloni[i].id == x.id){
          this.sabloni[i] = x;
      }
    }
  }, error =>{
    this.child.showModal(error);
  })
  }

  editSablon(sablon){
    this.isUpdate = true;
    this.currentSablon.id = sablon.id;
    this.currentSablon.minimumBodova = sablon.minimumBodova;
    this.currentSablon.ukupnoBodova = sablon.ukupnoBodova;
    this.currentSablon.naziv = sablon.naziv;
  }

}
