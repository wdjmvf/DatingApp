import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Input() valuesFromHome: any; // section 4 lecture 43 (Parent to child component) บน udemy ตอนประมาณเวลา 3:30 นาที
  @Output() cancelRegister = new EventEmitter(); // section 4 lecture 44 (Child to parent component)
  model: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model)
      .subscribe(() => {
        console.log('register successful');
      }, error => {
        console.log(error);
      });
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('Cancelled');
  }
}
