import { User } from './../_models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

// inject ถ้าเป็น component จะโดน angular inject มาให้ตั้งแต่เริ่มต้นเลย แต่ถ้าเป็น Service จะไม่ inject ให้ (Section 4 lecture 39 บน udemy)
@Injectable({
  providedIn: 'root' // inject ที่ root ของ project ในที่นี้ root คือ app module นั่นเอง
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService(); // Section  6 Lecture 54
  decodedToken: any; // Section 6 Lecture 55
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png'); // section 11 lecture 116
  currentPhotoUrl = this.photoUrl.asObservable();

constructor(private http: HttpClient) { }
  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }
  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user.user));
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            this.currentUser = user.user;
            this.changeMemberPhoto(this.currentUser.photoUrl);
          }
        })
      );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
     const token = localStorage.getItem('token');
     return !this.jwtHelper.isTokenExpired(token);
  }
}
