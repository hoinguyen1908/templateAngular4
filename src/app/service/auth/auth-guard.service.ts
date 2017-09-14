import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthService} from "./auth.service";



@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (AuthService.getInstance().checkPermission()) {
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
