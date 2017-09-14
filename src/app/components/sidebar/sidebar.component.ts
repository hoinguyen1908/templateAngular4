import { Component, OnInit } from '@angular/core';
import { Broadcaster } from "../../service/broadcaster/broadcaster.service"

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent implements OnInit {

  constructor(private Broadcaster: Broadcaster) { }

  ngOnInit() {
  }

  isActive = false;
  showMenu = '';
  eventCalled() {
    this.isActive = !this.isActive;
  }
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  sendData() {
    this.Broadcaster.broadcast('message','send data to home')
  }

}
