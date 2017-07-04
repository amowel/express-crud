import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {Role} from '../models/role.enum';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [UserService]
})
export class DialogComponent implements OnInit {
  public user: User = new User();
  public confirmPassword: string;
  public isUpdate: boolean;
  @ViewChild('con') child: HTMLInputElement;
  constructor(public userService: UserService, public dialogRef: MdDialogRef<DialogComponent>, @Inject(MD_DIALOG_DATA) public data: User) { }
  ngOnInit() {
    if (this.data) {
      this.user = this.data;
      this.isUpdate = true;
    }
  }

  public postUser() {
    this.user.role = 'viewer';
    if (this.data) {
      this.userService.editUser({
        _id: this.user._id,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        date: this.user.date
      }).subscribe();
    }
    else
    this.userService.addUser(this.user).subscribe();
    this.dialogRef.close()
  }
  validate(passwordConfirm: HTMLInputElement) {
    const parent = document.querySelector('#main > div > md-card > form > div > md-card-content:nth-child(5) > md-input-container');
    const validity = this.user.password === this.confirmPassword;
    if (!validity && parent.classList.contains('ng-touched')) {
      parent.classList.add('mat-input-invalid');
      console.log(this.user.password, 'Im here');
      console.log(this.user);
    }
    else
      parent.classList.remove('mat-input-invalid');
  }


}
