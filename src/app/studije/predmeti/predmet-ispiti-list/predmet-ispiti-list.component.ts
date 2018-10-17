import { Component, OnInit, Input } from '@angular/core';
import { IspitDataService } from '../../../service/ispit.data.service';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../../../security/authentication.service';
import { UserDataService } from '../../../service/user.data.service';

@Component({
  selector: 'app-predmet-ispiti-list',
  templateUrl: './predmet-ispiti-list.component.html',
  styleUrls: ['./predmet-ispiti-list.component.css']
})
export class PredmetIspitiListComponent implements OnInit {
  @Input() predmet: any;
  ispiti: any[] = [];
  datePipe = new DatePipe("en-US");
  user: any;


  constructor(public ispitService: IspitDataService, public authService: AuthenticationService, public userDataService: UserDataService) { 




  }

  ngOnInit() {
    //GET NASTAVNIK ID FROM TOKEN/LOCALSTORAGE
  this.user = this.authService.getCurrentUser();  
  this.userDataService.getByUsername(this.user.username).subscribe(user =>{
  this.user = user;
  
  this.ispitService.getIspitByPredmetIdandNastavnikId(this.predmet.id, this.user.id).subscribe(res => {
    console.log(this.user.id + "tu je broj samo je debilcina");
      res.reverse();
      res.forEach(element => {
      element.datum = this.datePipe.transform(element.datum,"yyyy-MM-dd");
      element.rokZaPrijavu = this.datePipe.transform(element.rokZaPrijavu,"yyyy-MM-dd");
    });
    this.ispiti = res;
  });
  console.log( this.user.id + " tu je AAAAAAAAAAAAAAAA");
  
  });


  }

}
