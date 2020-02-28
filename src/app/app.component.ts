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
        // sessionStorage.setItem('name', 'Timothy Owusu');
        // sessionStorage.setItem('email', 'tim@ikolilu.com');
        // sessionStorage.setItem('phonenumber', '0243548900');
        if (!sessionStorage.getItem('name') && !sessionStorage.getItem('email') && !sessionStorage.getItem('phonenumber') ) {
            document.location.href = 'https://www.ikolilu.com/portal/v1.4.2/';
        } else {
            // process to getting started page...
        }
    }
}

