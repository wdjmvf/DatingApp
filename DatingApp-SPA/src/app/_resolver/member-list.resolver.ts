import { catchError } from 'rxjs/operators';
import { AlertifyService } from './../_services/alertify.service';
import { User } from './../_models/user';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';

// Subject Resolver Section 9 Lecture 90
@Injectable()
export class MemberListResolver implements Resolve<User[]> {
    constructor(private userService: UserService,
        private router: Router,
        private alertify: AlertifyService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers()
            .pipe(
                catchError(error => {
                    this.alertify.error('Problem retriving data');
                    this.router.navigate(['/home']); // ถ้าเราไม่ใส่ให้มัน redirect ไปหน้า home มันจะ loop อยู่หน้า member-list นี้เรื่อยๆ
                    return of(null); // of from Rxjs version 6
                })
            );
    }
}
