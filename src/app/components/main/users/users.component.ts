import { Component, OnInit, OnDestroy } from '@angular/core';
import {fadeInAnimation } from "../../../extension/animation/fadein.animation";
import {HttpRequestService} from "../../../service/http/http-request.service";
import {Broadcaster} from "../../../service/broadcaster/broadcaster.service";
import {UsersService} from "../../../data-model/users.service";
import {Logger} from "../../../service/logger/loger-service.service"



const log = new Logger("UserComponent");

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class UsersComponent implements OnInit, OnDestroy {

  constructor(private httpReqService: HttpRequestService) { }
  private messageUserList: any
  private userList: any[]

  ngOnInit() {
    // this.httpReqService.getAllUser();
    // // this.setPage(1);
    // this.messageUserList = Broadcaster.getInstance().on("msg_userList")
    //   .subscribe(code => {
    //     console.log('123123');
    //     this.userList = UsersService.getInstance().getUserList();
    //   })
    this.userList = UsersService.getInstance().getUserList();
  }

  ngOnDestroy() {
    // this.messageUserList.unsubscribe();
  }

  settings = {
    actions: false,
    columns: {
      firstName: {
        title: 'Name',
        type: 'string'
      },
      lastName: {
        title: 'Last Name',
        type: 'string'
      },
      username: {
        title: 'Username',
        type: 'string'
      },
      email: {
        title: 'Email',
        type: 'string'
      },
      age: {
        title: 'Age',
        type: 'string'
      },
      status: {
        title: 'Status',
        type: 'string',
      }
    }
  };

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }




}
