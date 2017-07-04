import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {RegisterFormComponent} from '../register-form/register-form.component';
import {MdDialog} from '@angular/material';
import {DialogComponent} from '../dialog-component/dialog.component';
import {User} from '../models/user';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit, AfterViewInit {
  public currentUser: User;
  @ViewChild('search') searchElement;
  constructor(private router: Router, public dialog: MdDialog, private auth: AuthService, public userService: UserService) { }
  ngOnInit() {}

  ngAfterViewInit(): void {
    this.router.navigate([{ outlets: { main: ['usertable'] } }]);
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    console.log(this.currentUser);
    Observable.fromEvent(this.searchElement.nativeElement, 'keyup ')
      .debounceTime(200).map((event: Event) => {
      return (<HTMLInputElement>event.target).value;
    }).do(value => {
      console.log(value);
      this.userService.getSearched(value).do(users => {this.userService.users = users; console.log(users)}).subscribe();
    }).subscribe();
  }
  openModal() {
    console.log(localStorage.getItem('user'));
    const dialogref = this.dialog.open(DialogComponent);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
