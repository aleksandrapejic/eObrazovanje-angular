import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserDataService } from '../service/user.data.service';
import { UplataDataService } from '../service/uplata.data.service';
import { IspitDataService } from '../service/ispit.data.service';
import { PredmetDataService } from '../service/predmet.data.service';
import { PrijavaDataService } from '../service/prijava.data.service';
import { AuthenticationService } from '../security/authentication.service';
import { DatePipe } from '@angular/common';
import { ErrorDialogComponent } from '../dialog/error-dialog/error-dialog.component';
import { Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  user = {id:null, username:"", password:"", ime:"", prezime:"", adresa:"", role:"", brojIndexa: "", tekuciRacun: "", jmbg:"", brojTelefona: "", subscribedTelegram: "", chatId: ""};
  polozeni: any[];
  nepolozeni: any[];
  prijavljeniPredmeti:any[];
  uplate: any[];
  @Input()  uplata: any;
  @Input() predmet: any;
  @Input()  ispit: any;
  valid: boolean;
  dokumenti: any;
  currentDate = new Date();
  datePipe = new DatePipe("en-US");
  odjavaId: any;
  currentPassword = "";
  newPassword = "";
  confirmPassword = "";
  passwordConfirmation = false;
  pozdrav = "Prijavi se na E-obrazovanje Telegram bota za brz mobilni pristup informacija o skolovanju!";
  telegrambot = "U Telegram aplikaciji potrazi bota pod nazivom: /eobrazovanje_bot .";
  objasnjenje = "Nakon potvrde identiteta, imaces pristup studentskom meniju koji nudi nekoliko usluga. ";
 
  @ViewChild(ErrorDialogComponent) child: ErrorDialogComponent;

  constructor(public userDataService: UserDataService, public uplateService: UplataDataService ,public predmetiService: PredmetDataService, public prijavaService: PrijavaDataService, public authService: AuthenticationService, private router:Router) {
     
    console.log(this.pozdrav + this.telegrambot);

  }

  ngOnInit() { 
  

    this.user = this.authService.getCurrentUser();  
        this.userDataService.getByUsername(this.user.username).subscribe(user =>{
        this.user = user;
        this.currentPassword = this.user.password;
        console.log(this.user.chatId);

        if (this.user.role == "STUDENT"){
          this.getPolozeniPredmeti(this.user.id);
          this.getNepolozeniPredmeti(this.user.id);
          this.getPrijave(this.user.id);
          this.getUplate(this.user.id);
          this.getDokumenti(this.user.id);
          
        }
    }, error =>{
      this.child.showModal(error);
    })
  }



  getDokumenti(userId){
    this.userDataService.getDokumentiByStudentId(userId).subscribe( d => {
      d.forEach(element => {
        element.datumDokumenta = this.datePipe.transform(element.datumDokumenta, "yyyy-MM-dd");
      });
      this.dokumenti = d; });
  }

  getUplate(userId){
    this.uplateService.getUplateByStudentId(this.user.id).subscribe( u => {
      this.uplate = u.body;
      this.uplate.forEach(element => {
        element.datumUplate = this.datePipe.transform(element.datumUplate, "yyyy-MM-dd");
      });
    }, error =>{
      this.child.showModal(error);
    })
  }

  getPolozeniPredmeti(userId){
    this.userDataService.getPolozeniPredmeti(userId).subscribe( p => {
      p.forEach(element => {
        element.ocena = Math.ceil(element.osvojeniBodoviIspit/10);
      });
      this.polozeni = p; 
    }, error =>{
      this.child.showModal(error);
    })
  }

  getNepolozeniPredmeti(userId){
    this.userDataService.getNepolozeniPredmeti(userId).subscribe( n => {this.nepolozeni = n; });
  }

  getPrijave(userId){
    this.prijavaService.getPrijaveByStudentId(userId).subscribe( prijave => {
      prijave.forEach(element => {
        console.log(element.datumPrijave);
        console.log(this.currentDate);
        if (element.osvojeniBodoviIspit>51 && element.polozio){
          element.ocena = Math.ceil(element.osvojeniBodoviIspit/10);
        }else{
          element.ocena = "N/A";
        }
        
      });
      this.prijavljeniPredmeti = prijave; 
    }, error =>{
      this.child.showModal(error);
    })
  }

 
  changePassword(){
    this.userDataService.updatePassword(this.currentPassword,this.newPassword).subscribe(res => {
      this.authService.logout();
      this.router.navigateByUrl('/prijava');
    }, error =>{
      this.child.showModal(error);
    });
  }
  
  izmenaBroja(user){

    this.valid = true;
    this.user.brojTelefona = user.brojTelefona;
    console.log(user.brojTelefona);
  } 

  posaljiIzmenuBroja(){
    this.userDataService.changePhoneNumber(this.user.id, this.user).subscribe(x => {

    }, error =>{
      this.child.showModal(error);
    });
    }
    
 

    izmeniPrijavuChatBot(user){

    this.valid = true;
    this.user.subscribedTelegram = user.subscribedTelegram;
    console.log(user.subscribedTelegram);
  }


  posaljiIzmenuPrijaveChatBot(){
    this.userDataService.changeSubscriptionTelegramBot(this.user.id, this.user).subscribe(x => {

    }, error =>{
      this.child.showModal(error);
    });
    }



  odjavi(prijavaId){
    this.odjavaId = prijavaId;
  }

  confirmOdjava(){
    let deleteIndex = null;
    this.prijavaService.deletePrijava(this.odjavaId).subscribe(res =>{
      this.prijavljeniPredmeti.forEach((element, index) => {
        if (this.odjavaId == element.id){
          deleteIndex = index;
        }
      });
    this.prijavljeniPredmeti.splice(deleteIndex,1);
    }, error =>{
      this.child.showModal(error);
    })
  }

  compareDates(prijavaDate){
    if (prijavaDate<this.currentDate){ 
      return true;
    }else{
      return false;
    }
  }


}
