import { AuthService } from "./../../_services/auth.service";
import { UserService } from "./../../_services/user.service";
import { AlertifyService } from "./../../_services/alertify.service";
import { ActivatedRoute } from "@angular/router";
import { User } from "./../../_models/user";
import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm')
  editForm: NgForm; // Section 10 Lecture 96 เอาไว้ reset form
  user: User;
  photoUrl: string; // section 11 lecture 116

  // HostListener เอามาเพื่อจับ event ของ browser ณ code นี้
  // เมื่อ window เกิด event beforeunload จะส่ง event ไปที่ method unloadNotification()
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event) {
    if (this.editForm.dirty) {
      $event.returnValue = true; // สั่งให้ browser แสดง confirmbox แจ้งตือนก่อนที่หน้าต่างนั้นจะถูกปิด
    }
  }

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl); // section 11 lecture 116
  }

  updateUser() {
    this.userService
      .updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(next => {
        this.alertify.success('Profile updated successfully!');
        this.editForm.reset(this.user); // โยน model เข้าไปให้มันตอน form reset ด้วย ไม่งั้น control ที่อยู่ใน form ทุกอันจะหายหมด
      }, error => {
        this.alertify.error(error);
      });
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }
}
