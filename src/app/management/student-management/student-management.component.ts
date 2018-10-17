import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserDataService } from '../../service/user.data.service';
import { ErrorDialogComponent } from '../../dialog/error-dialog/error-dialog.component';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent implements OnInit {
  @Input() users:any[] = [];
  deleteId:number;
  deleteName:string;
  currentUser = {id:"", username:"", password:"", ime:"", prezime:"", adresa:"", role:"STUDENT", brojIndexa: "", tekuciRacun: "", jmbg:""};
  passwordRepeat:string;
  userNameOriginal:string;
  valid:boolean;
  isUpdate: boolean;
  activePage: number = 1;
  size: number = 5;
  filterIme: string;
  filterPrezime: string;
  pageCount = [];
  @ViewChild(ErrorDialogComponent) child: ErrorDialogComponent; 
  
  constructor(public userService : UserDataService) { 
       this.getStudents();
  }

  getStudents(){
    this.userService.getStudenti(this.activePage-1, this.size, this.filterIme, this.filterPrezime).subscribe(res => {
      this.pageCount = Array(parseInt(res.headers.get("total"))).fill(0).map((x,i)=>i);
      if (this.pageCount.length == 0){
        this.pageCount.push(0);
      }
      this.users = res.body;
      }, error =>{
        this.child.showModal(error);
      });
  }

  deleteStudent(id, name){
    this.deleteId = id;
    this.deleteName = name;
  }

  deleteConfirm(){
    var deleteIndex: number;
    this.userService.deleteStudent(this.deleteId).subscribe(res => {
      this.users.forEach((element, index) => {
        if (this.deleteId == element.id){
          deleteIndex = index;
        }
      });
      this.users.splice(deleteIndex,1);
    if (this.users.length == 0){
      if (this.activePage!=1){
        this.activePage = this.activePage - 1;
        }
        this.getStudents();
    }else{
      if (this.activePage < this.pageCount.length){
        this.getStudents();
      }
    }
    }, error =>{
      this.child.showModal(error);
    });
      
  }

  ngOnInit() {
  }

  saveConfirm(){
   if (!this.isUpdate){
      this.save();
      }else{
      this.update();
    }
  }

  save(){
    this.userService.addUser(this.currentUser).subscribe(x => {
        if (this.users.length == this.size){
            this.pageCount.push(this.pageCount.length+1);
            this.changePage(this.pageCount.length);
        }
        this.users.push(x);
        this.reset();
      }, error =>{
        this.child.showModal(error);
      });
  }

  reset(){
    this.currentUser.ime="";
    this.currentUser.adresa="";
    this.currentUser.prezime="";
    this.currentUser.password="";
    this.currentUser.username="";
    this.userNameOriginal="";
    this.passwordRepeat="";
    this.currentUser.brojIndexa = "";
    this.currentUser.tekuciRacun = "";
    this.currentUser.jmbg = "";
  }

  checkForUsername(){
  this.valid = true;
  this.userService.checkForUsername(this.currentUser.username).subscribe((res)=>{
    if (this.currentUser.username != this.userNameOriginal || this.userNameOriginal=="")
      this.valid=false;
    }, (err)=>{
      if (err.status == 302){
        if (this.currentUser.username != this.userNameOriginal || this.userNameOriginal=="")
          this.valid=false;
      }
    })
  }
 
  addStudent(){
    this.reset();
    this.isUpdate = false;
    
  }

  update(){
    this.userService.updateUser(this.currentUser.id, this.currentUser).subscribe(x => {
    var index;
    for (let i =0; i<this.users.length; i++){
      if (this.users[i].id == x.id){
        this.users[i] = x;
        index = i;
        }
      }
    
}, error =>{
  this.child.showModal(error);
});

  }

  editStudent(user){
    this.isUpdate = true;
    this.valid = true;
    this.currentUser.adresa = user.adresa;
    this.currentUser.id = user.id;
    this.currentUser.ime = user.ime;
    this.currentUser.prezime = user.prezime;
    this.currentUser.username = user.username;
    this.userNameOriginal = user.username;
    this.currentUser.tekuciRacun = user.tekuciRacun;
    this.currentUser.jmbg = user.jmbg;
    this.currentUser.brojIndexa = user.brojIndexa;
  }


  showUplate(id){
    this.users.forEach(element => {
      if (element.id == id) element.showUplate = !element.showUplate;
    }, error =>{
      this.child.showModal(error);
    });
  }

  
  showDokumenti(id){
    this.users.forEach(element => {
      if (element.id == id) element.showDokumenti = !element.showDokumenti;
    }, error =>{
      this.child.showModal(error);
    });
  }

  changePage(page) {
      this.activePage = page;
      this.getStudents();
  }

}
