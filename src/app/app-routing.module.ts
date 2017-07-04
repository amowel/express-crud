import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {RegisterFormComponent} from './register-form/register-form.component';
import {MainComponent} from './main/main.component';
import {MainHeaderComponent} from './main-header/main-header.component';

const routes: Routes = [
  {
    path: 'authorized',
    component: MainHeaderComponent
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: HeaderComponent,
  },
  {
    path: 'register',
    component: RegisterFormComponent,
    outlet: 'main'
  },
  {
    path: 'usertable',
    component: MainComponent,
    outlet: 'main'
  },
  {
    path: 'login',
    component: LoginFormComponent,
    outlet: 'main'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
