import {Injectable} from '@angular/core';
import {Ng2DeviceService} from 'ng2-device-detector';
import {Headers} from "@angular/http";
import { AuthDataModelService } from "../../data-model/auth-data-model.service"


function _window(): any {
  // return the global native browser window object
  return window;
}



@Injectable()
export class HttpHeaderService {

  private static instance: HttpHeaderService;
  private deviceService: Ng2DeviceService

  constructor() {
    this.deviceService = new Ng2DeviceService();
  }

  public static getInstance(): HttpHeaderService {
    if (!HttpHeaderService.instance) {
      HttpHeaderService.instance = new HttpHeaderService();
    }
    return HttpHeaderService.instance
  }


  getRequestHeader():Headers {

    let deviceInfo = this.deviceService.getDeviceInfo();
    var mywindow = _window().encodeURIComponent(deviceInfo.os + ":" + deviceInfo.os_version + ":" + deviceInfo.browser + ":" + deviceInfo.browser_version + ":" + deviceInfo.device);
    var headers = new Headers()
    headers.append('Content-Type', "application/json");
    headers.append('session-token', AuthDataModelService.getInstance().getSocketId());
    headers.append('app-version', '0.0.10a:Web');
    headers.append('device-info', mywindow);
    headers.append('device-id', "website");
    headers.append('checking', (new Date()).toString());

    if (AuthDataModelService.getInstance().isLogin()) {
      headers.append('token',AuthDataModelService.getInstance().getToken());
    }

    return headers;
  }

}
