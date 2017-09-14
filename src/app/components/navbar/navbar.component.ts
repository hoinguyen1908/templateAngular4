import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('push-right');
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }

  onLoggedout() {
    // localStorage.removeItem('isLoggedin');
    // this.router.navigate(['/login']);
  }

  changeLang(language: string) {
    // this.translate.use(language);
  }

}
