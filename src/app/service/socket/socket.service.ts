import {Injectable, OnInit, OnDestroy} from '@angular/core';
import {webSocket} from  "rxjs/observable/dom/webSocket";
import {Logger} from "../../service/logger/loger-service.service";
import {environment} from '../../../environments/environment';
import {SocketDataService} from './socket-data.service';

const log = new Logger("Socket");

@Injectable()
export class SocketService implements OnInit, OnDestroy {


  private static _instance: SocketService;
  private ws
  private timeInterval


  constructor() {
  }

  public static getInstance(): SocketService {
    if (!SocketService._instance)
      SocketService._instance = new SocketService();

    return SocketService._instance
  }


  connect() {
    this.ws = webSocket({
      url: environment.socketUrl,
      resultSelector: e => e.data,
      openObserver: {
        next: () => log.debug('socket open'),
        error: e => log.error(e)
      },
      closeObserver: {
        next: () => log.debug('socket close')
      },
      binaryType: 'blob'
    });

    this.ws.subscribe(
      (msg) => {
        if (msg != "pong") {
          SocketDataService.getInstance().analysisData(msg);
        } else {

        }
      },
      (err) => {
        log.debug("socket return error")
        log.debug(err)
      },
      () => {
        log.debug("socket close complete")
      }
    )

    this.timeInterval = setInterval(() => {
      this.ws.next('ping')
    }, 1000 * 2);

    ;
  }

  disconnect() {
    if (this.ws) {
      this.ws.unsubscribe();
    }

    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }


  ngOnInit() {
  }

  ngOnDestroy() {
    log.debug("destroy")
    this.ws.unsubscribe();
    clearInterval(this.timeInterval);
  }


}
