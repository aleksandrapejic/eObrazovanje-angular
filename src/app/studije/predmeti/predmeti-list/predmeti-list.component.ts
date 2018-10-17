import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { UserDataService } from '../../../service/user.data.service';
import { PredmetDataService } from '../../../service/predmet.data.service';
import { AuthenticationService } from '../../../security/authentication.service';
import { ErrorDialogComponent } from '../../../dialog/error-dialog/error-dialog.component';

@Component({
  selector: 'app-predmeti-list',
  templateUrl: './predmeti-list.component.html',
  styleUrls: ['./predmeti-list.component.css']
})
export class PredmetiListComponent implements OnInit {

  predmeti:any[] = [];
  user: any;
  @ViewChild(ErrorDialogComponent) child: ErrorDialogComponent; 

  constructor(public predmetService: PredmetDataService, public auth: AuthenticationService, public userservice: UserDataService) { 
  }

  ngOnInit() {

    this.user = this.auth.getCurrentUser();  
      this.userservice.getByUsername(this.user.username).subscribe(user =>{
      this.user = user;
      if(user.role === "NASTAVNIK"){
         this.predmetService.getPredmetByNastavnikId(this.user.id).subscribe(res => this.predmeti = res);
      }
      else if(user.role === "STUDENT"){
         this.predmetService.getPredmetByStudentId(this.user.id).subscribe(res => this.predmeti = res);
      }
      else{

        this.predmetService.getPredmeti().subscribe(res => this.predmeti = res);

      }
  }, error =>{
    this.child.showModal(error);
  })

}

}
