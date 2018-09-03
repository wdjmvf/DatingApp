import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { appRoutes } from './routes';

import { AlertifyService } from './_services/alertify.service';
import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsaveChanges } from './_guards/prevent-unsaved-changes-guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { RegisterComponent } from './register/register.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberEditResolver } from './_resolver/member-edit.resolver';

// Selection 9 lecture 86 แก้เรื่อง loin ครั้งแรกแล้ว token ยังไม่มี ก็เลยให้ get token ตั้งแต่แรกเลย
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
      MemberDetailComponent,
      MemberEditComponent,
      PhotoEditorComponent
   ],
   imports: [
      FileUploadModule, // Section 11 Lecture 108 ng2-fileupload
      // Section 5 Lecture 56 ใช้ dropdown link ของ bootstrap ไม่ใช่ jquery
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      BrowserModule,
      HttpClientModule,
      FormsModule,
      // Section 5 Lecture 60 Routing
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule, // Section 9 Lecture 91 photo tab view
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
      UserService,
      MemberDetailResolver, // Section 9 Lecture 90
      MemberListResolver,
      MemberEditResolver, // Section 10 Lecture 94
      PreventUnsaveChanges
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
