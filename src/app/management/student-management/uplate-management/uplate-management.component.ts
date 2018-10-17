import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UplataDataService } from '../../../service/uplata.data.service';
import { DatePipe } from '@angular/common';
import { ErrorDialogComponent } from '../../../dialog/error-dialog/error-dialog.component';

@Component({
  selector: 'app-uplate-management',
  templateUrl: './uplate-management.component.html',
  styleUrls: ['./uplate-management.component.css']
})
export class UplateManagementComponent implements OnInit {
  @ViewChild(ErrorDialogComponent) child: ErrorDialogComponent; 
  @Input() userId: any;
  @Input() racunPrimaoca: any;
  uplate: any[] = [];
  activePage: number = 1;
  size: number = 5;
  pageCount = [];
  currentUplata = { datumUplate: Date,  iznosUplate:"", racunPrimaoca:"", svrhaUplate:"", pozivNaBroj:""}

    constructor(public uplateDataService: UplataDataService) {
    
     }
  
    ngOnInit() {
      this.getUplate();
    }

    getUplate(){
      this.uplateDataService.getUplateByStudentId(this.userId, this.activePage-1, this.size).subscribe(res => {
        this.uplate = res.body;  
        this.pageCount = Array(parseInt(res.headers.get("total"))).fill(0).map((x,i)=>i);
        if (this.pageCount.length == 0){
        this.pageCount.push(0);
        }
      }, error =>{
        this.child.showModal(error);
      });
    }

    changePage(page) {
      this.activePage = page;
      this.getUplate();
    }

  save(){
    this.uplateDataService.addUplata(this.currentUplata).subscribe(x => {
        this.uplate.push(x);
        this.reset();
      }, error =>{
        this.child.showModal(error);
      });
  }

  reset(){
    this.currentUplata.iznosUplate="";
    this.currentUplata.racunPrimaoca="";
    this.currentUplata.svrhaUplate="";
    this.currentUplata.pozivNaBroj="";
  }

  addUplata(){
    this.reset();
    this.currentUplata.racunPrimaoca = this.racunPrimaoca;
  }

}
