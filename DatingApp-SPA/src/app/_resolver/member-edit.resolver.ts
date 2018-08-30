import { AuthService } from './../_services/auth.service';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from './../_services/alertify.service';
import { User } from './../_models/user';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';

// Subject Resolver Section 10 Lecture 94
@Injectable()
export class MemberEditResolver implements Resolve<User> {
    constructor(private userService: UserService,
        private router: Router,
        private authService: AuthService,
        private alertify: AlertifyService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(this.authService.decodedToken.nameid)
            .pipe(
                catchError(error => {
                    this.alertify.error('Problem retriving data');
                    this.router.navigate(['/members']);
                    return of(null); // of from Rxjs version 6
                })
            );
    }
}
