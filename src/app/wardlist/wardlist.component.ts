import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {mySchools} from '../myschools';
import {GeneralService} from '../general.service';
import {NotifyService} from "../notify.service";


@Component({
    selector: 'app-wardlist',
    templateUrl: './wardlist.component.html',
    styleUrls: ['./wardlist.component.css']
})
export class WardlistComponent implements OnInit {

    schools: mySchools[];
    wardlists = [];
    setTime: any;

    constructor(private _genservice: GeneralService, private router: Router, private _notify: NotifyService) {
    }

    ngOnInit() {
        $(function () {
            $('.fade').fadeIn();
            $('.preload').fadeIn();
        });
        this.getMyWards();
    }

    SetTime() {
        this.setTime = setTimeout(function(){ alert('Slow Network Connection...'); }, 10000);
    }

    StopTime() {
        clearTimeout(this.setTime);
    }
    getMyWards(): void {
        const s_schools = [];
        this.SetTime();
        this._genservice.getMyWards().subscribe(response => {
                if (response) {
                    this.StopTime();
                    $(function () {
                        $('.fade').fadeOut('slow');
                        $('.preload').fadeOut('slow');
                    });
                }
                for (let v = 0; v < response.length; v++) {
                    s_schools.push({
                        szschoolid: response[v].sz_schoolid,
                        szschoolname: response[v].schoolname
                    });
                    sessionStorage.setItem('schools', JSON.stringify(s_schools));
                    let term = response[v].sztermyear.split('-')[0];
                    if (term === '' || term === null || term === undefined) {
                        term = '1st';
                    }
                    let acayr = response[v].sztermyear.split('-')[1];
                    if (acayr === '' || acayr === null || acayr === undefined) {
                        acayr = '2017/2018';
                    }
                    let imgSrc = response[v].photo_file;
                    if (imgSrc === '' || imgSrc === null || imgSrc === undefined) {
                        imgSrc = 'assets/img/avatar.jpg';
                    } else {
                        const filename = encodeURI(response[v].photo_file);
                        imgSrc = 'https://www.ikolilu.com/academics/studentimgs/' + s_schools[v].szschoolid + '/' + filename;
                    }
                    this.wardlists.push({
                        photos: imgSrc,
                        student_id: response[v].student_id,
                        name: response[v].name,
                        sex: response[v].sex,
                        szclass: response[v].szclass,
                        stream: response[v].stream,
                        szprogram: response[v].szprogram,
                        szterm: term,
                        szacayr: acayr,
                        sz_schoolid: response[v].sz_schoolid,
                        schoolname: response[v].schoolname
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

    onSelectWard(ward): void {
        sessionStorage.setItem('currentClass', ward.szclass);
        sessionStorage.setItem('currentTerm', ward.szterm);
        sessionStorage.setItem('currentAcaYr', ward.szacayr);
        sessionStorage.setItem('studentid', ward.student_id);
        sessionStorage.setItem('schoolid', ward.sz_schoolid);
        sessionStorage.setItem('program', ward.szprogram);
        sessionStorage.setItem('studentName', ward.name);

        if (ward.szprogram === 'PRESCHOOL' || ward.szprogram === 'EARLY YEARS' || ward.szprogram === 'PRE-SCHOOL') {
            this.router.navigate(['preschool']);
        } else {
            this.router.navigate(['studentinfo']);
        }
    }
}
