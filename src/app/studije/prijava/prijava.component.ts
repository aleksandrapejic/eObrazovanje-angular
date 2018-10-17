import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserDataService } from '../../service/user.data.service';
import { PredmetDataService } from '../../service/predmet.data.service';
import { PrijavaDataService } from '../../service/prijava.data.service';
import { IspitDataService } from '../../service/ispit.data.service';
import { AuthenticationService } from '../../security/authentication.service';
import { DatePipe } from '@angular/common';
import { ErrorDialogComponent } from '../../dialog/error-dialog/error-dialog.component';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  dokumenti: any;
  user: any;
  ispitiZaPrijavu: any[] = [];
  prijava = { ispit: "", student:"", osvojeniBodoviUsmeni:"0"};
  currentPrijava: any;
  ispiti: any;
  datePipe = new DatePipe("en-US");
  @ViewChild(ErrorDialogComponent) child: ErrorDialogComponent; 


  constructor(public userDataService: UserDataService ,public auth: AuthenticationService, public prijavaService: PrijavaDataService, public ispitiService: IspitDataService) {
      this.user = this.auth.getCurrentUser();  
      this.userDataService.getByUsername(this.user.username).subscribe(user =>{
      this.user = user;
      this.ispitiService.getIspitiZaPrijavu(parseInt(user.id)).subscribe( i => {this.ispitiZaPrijavu = i; });               
      
        }, error =>{
          this.child.showModal(error);
        });
  }

  ngOnInit() { 
  }

  saveConfirm(){
      this.save();
  }
 
  addPrijava(prijavaIspit){
  this.prijava.ispit = prijavaIspit.id;
  this.prijava.student = this.user.id;
  this.prijava.osvojeniBodoviUsmeni = prijavaIspit.usmeniUkupnoBodova;
  }


  save(){
    this.prijavaService.addPrijava(this.prijava).subscribe(res => { 
      var deleteIndex;
      this.ispitiZaPrijavu.forEach((element, index) => {
        if (element.id == res.ispit.id){
          deleteIndex = index;
        }
        this.ispitiZaPrijavu.splice(deleteIndex,1);
      });
    }, error =>{
      this.child.showModal(error);
    });

  }
}
