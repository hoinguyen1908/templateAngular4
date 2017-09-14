import {Injectable} from '@angular/core';


@Injectable()
export class AuthDataModelService {

  private static instance: AuthDataModelService

  private socketId: string
  private token: string
  private refToken: string
  private phone: string
  private isLogined: boolean
  private retrytime: number


  constructor() {
  }

  public static getInstance(): AuthDataModelService {
    if (!AuthDataModelService.instance) {
      AuthDataModelService.instance = new AuthDataModelService()
    }
    return AuthDataModelService.instance;
  }

  // SOKETID
  setSocketId(id) {
    this.socketId = id;
  }

  getSocketId(): string {
    return this.socketId;
  }

  // TOKEN
  setToken(token) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  //REF_TOKEN
  setRefToken(ref) {
    this.refToken = ref
  }

  getRefToken(): string {
    return this.refToken
  }

  //PHONE
  setPhone(value) {
    this.phone = value
  }

  getPhone(): string {
    return this.phone
  }


  setRetrytimes(value) {
    this.retrytime = value;
  }

  getRetrytimes():number {
    return this.retrytime
  }

  //check isLogin
  isLogin(): boolean {
    if (this.getToken() && this.isLogined) {
      return true;
    } else {
      return false;
    }
  }




  saveData(authData, code,complete) {
    if (authData.retryTimes) {
      this.setRetrytimes(authData.retryTimes)
    } else if (authData.token) {
      this.setToken(authData.token);
      this.setRefToken(authData.refToken);
      this.setPhone(authData.phone);
      this.isLogined = true;
      this.setRetrytimes(5);

    }

    complete(true);


  }


}
