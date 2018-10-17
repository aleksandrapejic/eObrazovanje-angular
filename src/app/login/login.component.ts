import { Component, OnInit, ViewContainerRef, SystemJsNgModuleLoader, ViewChild, ElementRef } from '@angular/core';
import { UserDataService } from '../service/user.data.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AuthenticationService } from '../security/authentication.service';
import { ErrorDialogComponent } from '../dialog/error-dialog/error-dialog.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;
  @ViewChild(ErrorDialogComponent) child: ErrorDialogComponent; 

  constructor(public authenticationService: AuthenticationService ,public userDataService:UserDataService, public router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) { 

    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  login(){
    this.authenticationService.login(this.username, this.password).subscribe(r => {
      if (r == true){
        if(this.authenticationService.getCurrentUser().roles[0] == "ADMINISTRATOR"){
          this.router.navigateByUrl("/administracija");
        }
        else if (this.authenticationService.getCurrentUser().roles[0] == "NASTAVNIK"){
          this.router.navigateByUrl("/predmeti");
        }else{
          this.router.navigateByUrl("/profil");
        }
      }
    }, error => this.child.showModal("Invalid credentials!"))

  }

}
