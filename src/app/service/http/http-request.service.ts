import {Injectable} from '@angular/core';
import {HttpService} from './http-service.service'
import {HttpHeaderService} from "./http-header.service"

import {UtilService} from "../util/util.service";
import {Logger} from "../logger/loger-service.service";
import { RequestOptions } from '@angular/http';
import {Broadcaster} from "../broadcaster/broadcaster.service";
import {OtpDataModelService} from "../../data-model/otp-data-model.service";

const log = new Logger("Http-Request");

@Injectable()
export class HttpRequestService {

  private httpService: HttpService;


  constructor(private  http: HttpService) {
    this.httpService = http;

  }

  login(user: String, pass: String) {
    let passHash = UtilService.getInstance().hashPassword(pass)
    let reqOptions = new RequestOptions({headers: HttpHeaderService.getInstance().getRequestHeader()})
    let body = {
      'username': user,
      'password': passHash
    }


    log.debug(passHash);

    if (user ==='test@test.com' && passHash === 'e10adc3949ba59abbe56e057f20f883e') {
      Broadcaster.getInstance().broadcast('msg_otp', 299);
    } else {
      Broadcaster.getInstance().broadcast('msg_login', 4200);
    }


    //disable for demo
    /*
    this.httpService.post("/auth/admin/login",body, reqOptions)
      .subscribe(
        recent => {
          log.debug(recent)
        });
    */
  }


  submitOtp(codeOTP){

    let reqOptions = new RequestOptions({headers: HttpHeaderService.getInstance().getRequestHeader()})
    let body = {
      'codeOTP': codeOTP,
      'ref': OtpDataModelService.getInstance().getOTPRef()
    }

    this.httpService.post("/auth/admin/otp",body, reqOptions)
      .subscribe(
        recent => {
          log.debug(recent)
        });
  }

  resendOTP(){
    let reqOptions = new RequestOptions({headers: HttpHeaderService.getInstance().getRequestHeader()})
    let body = {
      'ref': OtpDataModelService.getInstance().getOTPRef()
    }
    this.httpService.delete("/auth/admin/otp",body, reqOptions)
      .subscribe(
        recent => {
          log.debug(recent)
        });
  }

  getAllUser() {
    let reqOptions = new RequestOptions({headers: HttpHeaderService.getInstance().getRequestHeader()})

    this.httpService.get("/admin/users", reqOptions)
      .subscribe(
        recent => {
          log.debug(recent)
        });
  }

  getAllTransaction() {
    let reqOptions = new RequestOptions({headers: HttpHeaderService.getInstance().getRequestHeader()})

    this.httpService.get("/admin/transaction", reqOptions)
      .subscribe(
        recent => {
          log.debug(recent)
        });
  }



}
