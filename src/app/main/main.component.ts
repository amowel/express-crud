import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {MdDialog} from '@angular/material';
import {RegisterFormComponent} from '../register-form/register-form.component';
import {Observable} from 'rxjs/';
import {DialogComponent} from '../dialog-component/dialog.component';
import {AuthService} from '../services/auth.service';
import {current} from 'codelyzer/util/syntaxKind';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  currentUser: User;
  page = 1;
  totalItems: number;
  pagination = 5;
  constructor(public userService: UserService, public dialog: MdDialog) { }
  ngOnInit() {
    this.updateUsers();
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    console.log(this.currentUser);
    console.log(this.pagination * this.page - this.pagination, ' ', this.pagination * this.page);
  }
  openModal(user: User) {
    const dialogref = this.dialog.open(DialogComponent, { data: user});
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe();
    this.userService.users = this.userService.users.filter(e => e !== user);
  }

  updateUsers()
  {
      this.userService.getUsersByPosition(this.pagination * this.page - this.pagination, this.pagination * this.page).subscribe(data => {
      this.totalItems = data.count;
      this.userService.users = data.users;
      console.log(this.userService.users);
    });
  }

  IsItemsToPaginate() {
    return this.userService.users.length >= this.pagination  || this.page === Math.ceil(this.totalItems / this.pagination)
  }


}
