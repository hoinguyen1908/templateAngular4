import {trigger, state, animate, transition, style} from '@angular/animations';

export const slideInOutAnimation =
  trigger('slideInOutAnimation', [

    state('void', style({position: 'relative'})),
    state('*', style({position: 'relative'})),
    transition(':enter', [
      style({opacity: 0, position: 'absolute', minWidth: '100%', 'height': '100vh', transform: 'translateX(-10%)'}),
      animate('0.5s ease-in', style({opacity: 1, transform: 'translateX(0)'}))
    ]),
    transition(':leave', [
      style({opacity: 1, position: 'absolute', minWidth: '100%', 'height': '100vh'}),
      animate('0.5s ease-out', style({opacity: 0, transform: 'translateX(10%)'}))
    ])
  ]);
