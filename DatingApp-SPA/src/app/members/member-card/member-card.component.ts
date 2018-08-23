import { User } from './../../_models/user';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})

// section 9 lecture 83 member card คือ child ของ member list component
export class MemberCardComponent implements OnInit {
  @Input() user: User;
  constructor() { }

  ngOnInit() {
  }

}
