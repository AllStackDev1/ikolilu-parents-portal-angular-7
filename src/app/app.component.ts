import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/filter';
import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
        alignSelectorRight: true,
    };
    constructor() {}

    ngOnInit() {
        // sessionStorage.setItem('name', 'Nedu');
        // sessionStorage.setItem('email', 'mrquarcs@gmail.com');
        // sessionStorage.setItem('email', 'tim@mycrointelsolutions.net');
        // sessionStorage.setItem('email', 'Nedu63ima@gmail.com');
        // sessionStorage.setItem('phonenumber', '0243548900');
        if (!sessionStorage.getItem('name') && !sessionStorage.getItem('email') && !sessionStorage.getItem('phonenumber') ) {
            document.location.href = 'https://www.ikolilu.com/portal/v1.4.2/';
        } else {
            // process to getting started page...
        }
    }
}

