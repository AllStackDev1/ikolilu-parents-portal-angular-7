import {Component, OnInit} from '@angular/core';
import {GeneralService} from '../general.service';
import {NotifyService} from '../notify.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    notices = [];
    setTime: any;

    constructor(private _genservice: GeneralService, private _notify: NotifyService) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.getNotifications(sessionStorage.getItem('schools'));
        }, 1500);
    }
    SetTime() {
        this.setTime = setTimeout(function(){ alert('Slow Network Connection...'); }, 10000);
    }

    StopTime() {
        clearTimeout(this.setTime);
    }
    getNotifications(schools: string): void {
        this.SetTime();
        this._genservice.getNotifications(schools).subscribe(response => {
                if (response) {
                    this.StopTime();
                }
                const s_schools = [];
                for (let v = 0; v < response.length; v++) {
                    s_schools.push({
                        szschoolid: response[v].sz_schoolid,
                        szschoolname: response[v].schoolname
                    });

                    const date = response[v].szpost_date;
                    const dateArr = date.split('-');
                    const newDateFormat = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
                    // let desc = response[v].szdescription;
                    // const descLength = response[v].szdescription.length;
                    // if (descLength > 60) {
                    //     const desc = response[v].szdescription.slice(0, 60);
                    //     console.log(desc + '...');
                    // }else{
                    //     const desc = response[v].szdescription;
                    //     // console.log(desc);
                    // }
                    let file = '';
                    if (response[v].sz_filename === '') {
                        file = 'NA';
                    } else {
                        const filename = encodeURI(response[v].sz_filename);
                        file = '<a target="_blank" href=https://www.ikolilu.com/newsinfo/' + s_schools[v].szschoolid + '/' + filename + '><i class="material-icons">attach_file</i></a>';
                    }
                    this.notices.push({
                        id: response[v].id,
                        notice_type: response[v].notice_type,
                        sztarget: response[v].sztarget,
                        szpost_date: newDateFormat,
                        szclose_date: response[v].szclose_date,
                        szdescription: response[v].szdescription,
                        szvenue: response[v].szvenue,
                        sz_filename: file,
                        sz_schoolid: response[v].sz_schoolid
                    });
                }
            },
            (error) => {
                if (error.status === 0) {
                    $(function () {
                        this.StopTime();
                        $('.fade').fadeOut('slow');
                        $('.preload').fadeOut('slow');
                    });
                    this._notify.showNotification('top', 'left', 'Please Check Your Network Connection', 'warning');
                    return;
                }
            });
    }
}



