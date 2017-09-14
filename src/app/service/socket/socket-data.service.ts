import {Injectable} from '@angular/core';
import {Logger} from "../logger/loger-service.service";
import {AuthDataModelService} from "../../data-model/auth-data-model.service";
import {OtpDataModelService} from "../../data-model/otp-data-model.service";
import {Broadcaster} from '../broadcaster/broadcaster.service'
import {UsersService} from "../../data-model/users.service";


const log = new Logger("Socket Data")

@Injectable()
export class SocketDataService {

  constructor() {
  }

  private static instance: SocketDataService;

  public static getInstance(): SocketDataService {
    if (!SocketDataService.instance) {
      SocketDataService.instance = new SocketDataService();
    }
    return SocketDataService.instance;
  }

  analysisData(data) {


    if (!data) {
      // log.debug("socket data is null");
      return;
    }
    let jsonData = null;
    try {
      jsonData = JSON.parse(data);
      log.debug(jsonData);
    } catch (e) {
      log.error('Cant Parse data to Json')
    }

    if (jsonData.socketID) {
      AuthDataModelService.getInstance().setSocketId(jsonData.socketID)
    } else {

      if (Array.isArray(jsonData.type)) {
        jsonData.type.map(typeId => {
          switch (typeId) {
            case 0: {
              UsersService.getInstance().saveData(jsonData.data, jsonData.code, function (flag) {
                if (flag) {
                  Broadcaster.getInstance().broadcast('msg_userList', jsonData.code)
                }
              })

              break;
            }
            case 1: { //Auth
              let authData = jsonData.data.auth
              AuthDataModelService.getInstance().saveData(authData, jsonData.code, function (flag: boolean) {
                if (flag) {
                  Broadcaster.getInstance().broadcast('msg_login', jsonData.code)
                }
              })
              break;
            }
            case 12: { //OTP
              OtpDataModelService.getInstance().saveData(jsonData.data.otp, jsonData.code, function (flag: boolean) {
                if (flag) {
                  Broadcaster.getInstance().broadcast('msg_otp', jsonData.code)
                }
              });
              break;
            }
          }
        });
      }
    }
  }

}
