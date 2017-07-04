import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [AuthService]
})
export class LoginFormComponent implements OnInit {
  model: any = {
    email: '',
    password: ''
  };
  constructor(private router: Router, private auth: AuthService) {}
  public login(): void {
    console.log(this.model.email);
    this.auth.login(this.model.email , this.model.password)
      .subscribe(
        (done) => { console.log(done)},
          () => {},
          () => { this.router.navigate(['/authorized']); }

      )
  }
  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      console.log('Entered');
      this.model.email = user.email;
      this.router.navigate(['/authorized']);
    }

  }

}
