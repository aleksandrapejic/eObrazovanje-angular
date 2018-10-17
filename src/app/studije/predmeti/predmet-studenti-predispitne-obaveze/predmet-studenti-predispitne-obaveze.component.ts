import { Component, OnInit, Input } from '@angular/core';
import { PredispitneObavezeSablonDataService } from '../../../service/predispitne-obaveze-sablon.data.service';
import { PredispitneObavezeDataService } from '../../../service/predispitne-obaveze.data.service';
import { DatePipe } from '@angular/common';
import { element } from 'protractor';
import { ENGINE_METHOD_DIGESTS } from 'constants';

@Component({
  selector: 'app-predmet-studenti-predispitne-obaveze',
  templateUrl: './predmet-studenti-predispitne-obaveze.component.html',
  styleUrls: ['./predmet-studenti-predispitne-obaveze.component.css']
})
export class PredmetStudentiPredispitneObavezeComponent implements OnInit {
  @Input() student: any;
  @Input() predmet: any;
  currentPredispitnaObaveza = {osvojeniBodovi:" ", student: "" , sablon:""};
  predmetPredispitneObaveze: any[];
  studentPredispitneObaveze: any[];
  datePipe = new DatePipe("en-US");

  constructor(public sablonService: PredispitneObavezeSablonDataService, public predispitneObavezeService: PredispitneObavezeDataService) { 

  }

  ngOnInit() {
    this.currentPredispitnaObaveza.student = this.student.id;
    this.sablonService.getSabloniByPredmetId(this.predmet.id).subscribe(resPredmet => {
      this.predispitneObavezeService.getPredispitneObavezeByStudentIdandPredmetId(this.student.id, this.predmet.id).subscribe(resStudent => {
        this.studentPredispitneObaveze= resStudent;
        for (var i = 0; i< resPredmet.length; i++){
          var found = false;
          resStudent.forEach(elementStudent =>{
            if (resPredmet[i].id == elementStudent.sablon.id){
              elementStudent.datum = this.datePipe.transform(elementStudent.datum,"yyyy/MM/dd");
              resPredmet[i] = elementStudent;
              found = true;
            }
          })
          if (!found){
            resPredmet[i].sablon = resPredmet[i];
            resPredmet[i].osvojeniBodovi = 0;
            resPredmet[i].datum = "N/A"
          }
        };
        this.predmetPredispitneObaveze = resPredmet;
      });
    })
  }

  reset(){
    this.currentPredispitnaObaveza.osvojeniBodovi = "";
    this.currentPredispitnaObaveza.sablon = "";
  }

  addPredispitnaObaveza(id){
    this.currentPredispitnaObaveza.sablon = id;
  }

  save(){
    this.predispitneObavezeService.addPredispitnaObaveza(this.currentPredispitnaObaveza).subscribe(res => {
      res.datum = this.datePipe.transform(res.datum,"yyyy/MM/dd");
      for (let i =0; i<this.predmetPredispitneObaveze.length; i++){
        if (this.predmetPredispitneObaveze[i].sablon.id == res.sablon.id) 
          this.predmetPredispitneObaveze[i] = res;
      }
    });
    this.reset();
  }

}
