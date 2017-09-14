import { Injectable } from '@angular/core';
import {AuthDataModelService} from "../../data-model/auth-data-model.service";

@Injectable()
export class AuthService {

  private static _instance: AuthService = new AuthService();

  constructor() {
    if (AuthService._instance) {
      throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
    }
    AuthService._instance = this;
  }

  public static getInstance():AuthService
  {
    return AuthService._instance;
  }




  checkPermission() {
    // return true
    return AuthDataModelService.getInstance().isLogin();
  }



}
