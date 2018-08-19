import { AuthService } from './_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService(); // เพื่อให้ user แสดงใน navbar ตั้งแต่ app ถูกโหลด ไม่ใช่แค่ตอนที่ login

  constructor(private authService: AuthService) {}
  ngOnInit() {
    const token = localStorage.getItem('token');
    this.authService.decodedToken = this.jwtHelper.decodeToken(token);
  }
}
