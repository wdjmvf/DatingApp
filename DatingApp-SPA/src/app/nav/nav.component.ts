import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public authService: AuthService,
  private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model)
      .subscribe(next => {
        this.alertify.success('Logged in successfully');
      }, error => {
        this.alertify.error(error);
      });
  }

  loggedIn() {
    /*
    const token = localStorage.getItem('token');
    // if token is empty then return false
    // if token is not empty then return true
    return !!token; */
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
  }

}
