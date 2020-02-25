import { Injectable } from '@angular/core';
declare var $: any;


@Injectable()
export class NotifyService {

  constructor() { }
  showNotification(from, align, msg, color) {

    $.notify({
        icon: 'notifications',
        message: msg

    },{
        type: color,
        timer: 5000,
        placement: {
            from: from,
            align: align
        }
    });
  }
}
