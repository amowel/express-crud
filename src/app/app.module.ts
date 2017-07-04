import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import {MdButtonModule, MdCheckboxModule, MdCardModule, MdInputModule, MdTabsModule, MdDialogModule} from '@angular/material';
import 'hammerjs';
import { RegisterFormComponent } from './register-form/register-form.component';
import { MainComponent } from './main/main.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {AuthService} from './services/auth.service';
import {DialogComponent} from './dialog-component/dialog.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {UserService} from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    RegisterFormComponent,
    MainComponent,
    MainHeaderComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdInputModule,
    MdTabsModule,
    HttpModule,
    MdDialogModule,
    NgxPaginationModule
  ],
  entryComponents: [DialogComponent],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
