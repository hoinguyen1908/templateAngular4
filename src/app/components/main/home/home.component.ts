import {Component, OnInit, OnDestroy} from '@angular/core';
import {Logger} from "../../../service/logger/loger-service.service"
import {fadeInAnimation } from "../../../extension/animation/fadein.animation"

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

import {Broadcaster} from "../../../service/broadcaster/broadcaster.service"



const log = new Logger("Home");

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.sass'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class HomeComponent implements OnInit, OnDestroy {

  message: any;


  constructor(private Broadcaster: Broadcaster) {
    log.debug("init home");

  }


  public lineChartData:Array<any> = [
    {data: [2351, 2489, 2751, 3215, 4086, 4594, 4824], label: 'User'},
    {data: [3232, 3823, 4573, 8352, 7329, 8012, 10342], label: 'Transaction'},
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(12,159,177,0.6)',
      borderColor: 'rgba(22, 93, 206,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(187, 193, 3,0.5)',
      borderColor: 'rgba(173, 158, 27,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';




  // events
  public chartClicked(e:any):void {
    log.debug(e)
  }

  public chartHovered(e:any):void {
    log.debug(e)
  }


  public doughnutChartLabels:string[] = ['Active User', 'Offline', 'Block User'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';

  public radarChartType:string = 'radar';
  public radarChartLabels:string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];


  public radarChartData:any = [
    {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
  ];


  ngOnInit() {
    // this.message = this.Broadcaster.on("message")
    //   .subscribe(mes => {
    //     log.debug(mes)
    //   })
  }
  ngOnDestroy() {
    log.debug("destroy")
    // this.message.unsubscribe();
    // this.ws.unsubscribe();
    // clearInterval(this.timeInterval);
  }

  view: string = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  activeDayIsOpen: boolean = true;


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    // this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    // this.refresh.next();
  }


}
