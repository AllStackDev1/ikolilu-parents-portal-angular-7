import {Component, OnInit, ElementRef, Inject} from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, DOCUMENT } from '@angular/common';
import { GeneralService } from '../../general.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    parent_name: string;
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
    constructor(
        location: Location,
        private element: ElementRef,
        private _genservice: GeneralService,
        @Inject(DOCUMENT) private document: any)
    {
      this.location = location;
      this.sidebarVisible = false;
    }

    ngOnInit(){
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        this.time();
        setInterval(() => {
            this.time();
            this.parent_name = sessionStorage.getItem('name');
        }, 500);
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
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

    getTitle() {
      let titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 2 );
      }
      titlee = titlee.split('/').pop();

      for(let item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee) {
              return this.listTitles[item].title;
          }
      }
      return this._genservice.stageTitle;
    }

    LogOut(): void {
        sessionStorage.clear();
        this.document.location.href = 'https://www.ikolilu.com/portal/v1.4.2/';
    }
}
