import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  test: Date = new Date();

  now;
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  digitalClock: any;
  newDate: any;
  Year;
  Month;
  Date;
  Hr;
  Min;
  Sec;
  constructor() { }

  ngOnInit() {
    this.time();
    setInterval(() => {
      this.time();
    }, 500);
  }
  time() {
    this.now    = new Date();
    this.Year   = this.now.getFullYear();
    this.Month  = this.months[this.now.getMonth()];
    this.Date   = this.now.getDate();
    this.Hr     = this.now.getHours();
    this.Min    = this.now.getMinutes();
    this.Sec    = this.now.getSeconds();
    if (this.Date.toString().length === 1) {
      this.Date = '0' + this.Date;
    }
    if (this.Hr.toString().length === 1) {
      this.Hr = '0' + this.Hr;
    }
    if (this.Min.toString().length === 1) {
      this.Min = '0' + this.Min;
    }
    if (this.Sec.toString().length === 1) {
      this.Sec = '0' + this.Sec;
    }
    if(this.Hr > 12) {
      const x = this.Hr - 12;
      if (x.toString().length === 1) {
        this.Hr = '0' + x;
      }else {
        this.Hr = x;
      }
      this.digitalClock = this.Hr + ':' + this.Min + ':' + this.Sec + ' PM';
    }else if(this.Hr === 12) {
      this.digitalClock = this.Hr + ':' + this.Min + ':' + this.Sec + ' PM';
    }else if(this.Hr === 0) {
      this.Hr = this.Hr + 12;
      this.digitalClock = this.Hr + ':' + this.Min + ':' + this.Sec + ' PM';
    }else {
      this.digitalClock = this.Hr + ':' + this.Min + ':' + this.Sec + ' AM';
    }
    this.newDate = this.Month + ' ' + this.Date + ', ' + this.Year;
  }
}
