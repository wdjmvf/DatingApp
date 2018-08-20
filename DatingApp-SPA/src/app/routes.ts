import { AuthGuard } from './_guards/auth.guard';
// Section 7 Lecture 60 เรื่อง Routing
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path : '', // localhost:4200/ค่าว่างmember ถ้าใส่ path เป็น dummy ก็จะเป็น localhost:4200/dummymembers อันนี้ ลักไก่มันแบบนี้
        runGuardsAndResolvers: 'always',
        canActivate: [ AuthGuard ],
        children: [
            { path: 'members', component: MemberListComponent, },
            { path: 'messages', component: MessagesComponent },
            { path: 'lists', component: ListsComponent },
        ]
    },
    // ถ้า path ข้างบนไม่มีอันไหน match เลยมันจะ redirect ไป home
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
