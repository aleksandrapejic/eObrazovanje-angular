import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../security/authentication.service';
import { UserDataService } from '../service/user.data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  currentUser: any;

  constructor(private router: Router, public authService: AuthenticationService, public userService: UserDataService) { 
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngLogout(){
    this.authService.logout();
    this.router.navigateByUrl('prijava');

  }
}
