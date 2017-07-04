import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public navigate(event) {
    this.router.navigate([{outlets: { main: [event.tab.textLabel.toLowerCase()]}}]);
  }
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate([{outlets: { main: ['login']}}]);
  }

}
