import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-predmeti-profile',
  templateUrl: './predmeti-profile.component.html',
  styleUrls: ['./predmeti-profile.component.css']
})
export class PredmetiProfileComponent implements OnInit {


  predmeti:any[] = [];
 
  predmet = { id:"1", naziv:"Osnove racunarstva", oznaka:"OR1",espb:"7"};
  
  
  constructor() { 
       this.predmeti.push(this.predmet);

  }


  ngOnInit(){}
}
