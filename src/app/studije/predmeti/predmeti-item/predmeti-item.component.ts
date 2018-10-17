import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-predmeti-item',
  templateUrl: './predmeti-item.component.html',
  styleUrls: ['./predmeti-item.component.css']
})
export class PredmetiItemComponent implements OnInit {


  @Input() predmet = { id:"1", naziv:"Osnove racunarstva", oznaka:"OR1",espb:"7"};
  
  
  constructor() { 


  }


  ngOnInit(){}

}
