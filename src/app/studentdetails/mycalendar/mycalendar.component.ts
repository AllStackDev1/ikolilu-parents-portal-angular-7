import { Component, OnInit, ViewChild  } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

import { GeneralService } from '../../general.service';
import { SchoolCalendar } from '../../calendar';

@Component({
  selector: 'app-mycalendar',
  templateUrl: './mycalendar.component.html',
  styleUrls: ['./mycalendar.component.css']
})
export class MycalendarComponent implements OnInit {

  displayEvent: any;
  calendarOptions: Options;
  calendar: SchoolCalendar[];
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(private _genservice: GeneralService) { }

  ngOnInit() {
   this._genservice.getCalendar().subscribe(response => {
     this.calendar = response;
     this.calendarOptions = {
       editable: true,
       eventLimit: false,
       header: {
         left: 'prev,next today',
         center: 'title',
         right: 'month,agendaWeek,agendaDay,listMonth'
       },
       events: this.calendar
     };
   });
  }

  clickButton(model: any) {
    this.displayEvent = model;
  }

  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    };
    this.displayEvent = model;
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    };
    this.displayEvent = model;
  }

}
