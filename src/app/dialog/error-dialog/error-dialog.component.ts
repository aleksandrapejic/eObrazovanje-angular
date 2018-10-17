import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {
  message: any;
  @ViewChild("basicModal") modal;
  
  constructor() { }

  ngOnInit() {
  }

  showModal(message){
    this.message = message;
    this.modal.show();
    setTimeout(() => 
    {
      this.modal.hide();
    },
    2000);
  }

}
