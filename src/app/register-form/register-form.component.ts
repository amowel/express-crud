import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {Role} from '../models/role.enum';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  providers: [UserService]
})
export class RegisterFormComponent implements OnInit, AfterViewInit {
  public user: User = new User();
  public confirmPassword: string;
  @ViewChild('passwordConfirm') passwordConfirm;
  constructor(public userService: UserService, public auth: AuthService, public router: Router) { }
  ngOnInit() {
  }

  public postUser() {
    this.user.role = 'viewer';
    this.userService.addUser(this.user).subscribe(
      () => {
        this.login();
      }
    );
  }
  ngAfterViewInit(): void {
  }
  validate(passwordConfirm: HTMLInputElement) {
    let parent = passwordConfirm.parentElement.parentElement.parentElement.parentElement;
    let validity = this.user.password === this.confirmPassword;
    if (!validity && passwordConfirm.classList.contains('ng-touched') && passwordConfirm.value !== '') {
      parent.classList.add('mat-input-invalid');
    }
    else
      parent.classList.remove('mat-input-invalid');
    console.log(parent.classList);
    console.log(passwordConfirm.hasAttribute('ng-touched'));
  }

  public login(): void {
    console.log(this.user.email);
    this.auth.login(this.user.email , this.user.password)
      .subscribe(
        (done) => {
          if (done) this.router.navigate(['/authorized']);
        }
      )
  }

}
