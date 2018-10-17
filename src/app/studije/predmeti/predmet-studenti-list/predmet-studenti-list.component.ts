import { Component, OnInit, Input } from '@angular/core';
import { UserDataService } from '../../../service/user.data.service';
import { PredmetDataService } from '../../../service/predmet.data.service';

@Component({
  selector: 'app-predmet-studenti-list',
  templateUrl: './predmet-studenti-list.component.html',
  styleUrls: ['./predmet-studenti-list.component.css']
})
export class PredmetStudentiListComponent implements OnInit {
  @Input() predmet: any;
  studenti: any[] = [];

  constructor(public userService: UserDataService, public predmetService:PredmetDataService) { }

  ngOnInit() {
    this.predmetService.getStudenti(this.predmet.id).subscribe(res => this.studenti=res);
  }

}
