import { Injectable } from '@angular/core';
import { Broadcaster } from './broadcaster.service'
@Injectable()
export class MessageCenterService {

  constructor(private Broadcaster: Broadcaster) { }

  public sendMessage(msgId:string, data:any) {
    this.Broadcaster.broadcast(msgId, data);
  }



}
