import { Injectable } from '@angular/core';

@Injectable()
export class OtpDataModelService {

  private static instance: OtpDataModelService
  private otpRef: string;
  private phoneHash: string;
  private retrytime: number

  constructor() { }

  public static getInstance():OtpDataModelService {
    if (!OtpDataModelService.instance) {
      OtpDataModelService.instance = new OtpDataModelService()
    }
    return OtpDataModelService.instance;
  }

  setOTPRef(value){
    this.otpRef = value;
  }
  getOTPRef():string{
    return this.otpRef;
  }

  setPhone(value){
    this.phoneHash = value;
  }
  getPhone():string{
    return this.phoneHash;
  }

  setRetrytime(value){
    this.retrytime = value;
  }
  getRetrytime():number{
    return this.retrytime;
  }

  saveData(data, code, complete) {
    if (code === 298) {
      this.setOTPRef(data.ref);
      this.setPhone(data.phone);
      this.setRetrytime(3);
    } else if(code === 4031){
        this.setRetrytime(data.retryTimes);
    }

    complete(true);
  }




}
