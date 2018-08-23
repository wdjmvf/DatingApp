import { appRoutes } from './routes';

import { AlertifyService } from './_services/alertify.service';
import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { AuthGuard } from './_guards/auth.guard';
import { JwtModule } from '@auth0/angular-jwt';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';

// Selection 9 lecture 86
export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      MessagesComponent,
      ListsComponent,
      MemberCardComponent,
      MemberDetailComponent
   ],
   imports: [
      // Section 5 Lecture 56 ใช้ dropdown link ของ bootstrap ไม่ใช่ jquery
      BsDropdownModule.forRoot(),
      BrowserModule,
      HttpClientModule,
      FormsModule,
      // Section 5 Lecture 60 Routing
      RouterModule.forRoot(appRoutes),
      // Selection 9 lecture 86
      JwtModule.forRoot({
          config: {
              tokenGetter: tokenGetter,
              whitelistedDomains: ['localhost:5000'],
              blacklistedRoutes: ['localhost:5000/api/auth']
          }
      })
   ],
   // ใส่บรรทัดนี้เข้าไปปุ๊บ Auth Service (Service) ก็จะโดน Inject ให้ Component ใช้งานได้แล้ว
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      UserService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
