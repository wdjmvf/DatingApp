import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

// Section 9 Lecture 87 แสดง member detail และเอาค่า id ของ member มาตาก ActivatedRoute
@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  constructor(private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser(+this.route.snapshot.params['id'])
      .subscribe((user: User) => {
        this.user = user;
      }, error => {
        this.alertify.error(error);
      });
  }
}
