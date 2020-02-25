import {Component, OnInit} from '@angular/core';
import {AcademicYears} from '../../acayear';
import {StudentClass} from '../../StudentClass';
import {GeneralService} from '../../general.service';
import {NotifyService} from '../../notify.service';
import {ExamTypes} from '../../examtypes';
import {GradeLists} from '../../gradelist';
import { ActivatedRoute } from '@angular/router';

import {StudentScoresInfo} from '../../StudentScoresInfo';
import {SubjectsDetails} from '../../subjectsdetails';
import * as Chart from 'chart.js';
import { WardTermTeacherComment } from '../../wardtermteachercomment';
import { WardTermGeneralRemarks } from '../../wardtermremarkscomment';

@Component({
    selector: 'app-studentacademics',
    templateUrl: './studentacademics.component.html',
    styleUrls: ['./studentacademics.component.css']
})
export class StudentacademicsComponent implements OnInit {

    currentPage: string = '';

    acayears: AcademicYears[];
    selectedTerm: string;

    szclasses: StudentClass[];
    selectClass: string;

    examtypes: ExamTypes[];
    selectedExamType: string;

    gradelist: GradeLists[];
    teacherscomment: WardTermTeacherComment[];
    remarks: WardTermGeneralRemarks[];
    studentscores: StudentScoresInfo[];
    subjectsdetails: SubjectsDetails[];
    BarChart = [];
    HorizontalBar = [];
    setTime: any;

    constructor(private activatedRouter: ActivatedRoute, private _genservice: GeneralService, private _notify: NotifyService) {
    }

    ngOnInit() {
        $(function () {
            $('.fade').fadeIn();
            $('.preload').fadeIn();
        });
        this.selectClass = sessionStorage.getItem('currentClass');
        this.selectedExamType = 'TERMINAL';
        this.selectedTerm = sessionStorage.getItem('currentTerm');
        this.activatedRouter.url.subscribe(sa => sa.forEach(value => this.currentPage += `/${value}`));
        if (this.currentPage === '/studentinfo') {
            this.getStudentAcaYear();
            this.getStudentClass();
            this.getStudentExamTypes();
            // this.viewGradeInformation();
            // this.getWardTermTeachersComment();
            // this.getWardTermGeneralComment();

        }
        this._genservice.stageTitle = sessionStorage.getItem('studentName').toUpperCase();

    }

    SetTime() {
        this.setTime = setTimeout(function(){ alert('Slow Network Connection...'); }, 10000);
    }

    StopTime() {
        clearTimeout(this.setTime);
    }
    
    getStudentAcaYear(): void {
        this._genservice.getYearByAcademic().subscribe(response => {
                if (response) {
                    this.acayears = response;
                    this.StopTime();
                    $(function () {
                        $('.fade').fadeOut('slow');
                        $('.preload').fadeOut('slow');
                    });
                } else {
                    $(function () {
                        this.StopTime();
                        $('.fade').fadeIn();
                        $('.preload').fadeIn();
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
                    this.getStudentAcaYear();
                }
            }
        );
    }

    getStudentClass(): void {
        this._genservice.getStudentClasses().subscribe(response => {
                if (response) {
                    this.szclasses = response;
                    $(function () {
                        $('.fade').fadeOut('slow');
                        $('.preload').fadeOut('slow');
                    });
                } else {
                    $(function () {
                        this.StopTime();
                        $('.fade').fadeIn();
                        $('.preload').fadeIn();
                    });
                }
            },
            (error) => {
                if (error.status === 0) {
                    this.StopTime();
                    $(function () {
                        $('.fade').fadeOut('slow');
                        $('.preload').fadeOut('slow');
                    });
                    this._notify.showNotification('top', 'left', 'Please Check Your Network Connection', 'warning');
                    return;
                }
            }
        );
    }

    getStudentExamTypes(): void {
        this._genservice.getStudentExamTypes().subscribe(response => {
                if (response) {
                    this.examtypes = response;
                    this.StopTime();
                    $(function () {
                        $('.fade').fadeOut('slow');
                        $('.preload').fadeOut('slow');
                    });
                } else {
                    this.StopTime();
                    $(function () {
                        $('.fade').fadeIn();
                        $('.preload').fadeIn();
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

    getWardTermTeachersComment(): void {
        this._genservice.getWardTermTeachersComment(this.selectClass, this.selectedExamType, this.selectedTerm).subscribe(response => {
            if (response) {
                this.SetTime();
                this.teacherscomment = response;
                $(function () {
                    $('.fade').fadeOut('slow');
                    $('.preload').fadeOut('slow');
                });
            } else {
                this.StopTime();
                $(function () {
                    $('.fade').fadeIn();
                    $('.preload').fadeIn();
                });
            }
        },
        (error) => {
            this.StopTime();
            if (error.status === 0) {
                $(function () {
                    $('.fade').fadeOut('slow');
                    $('.preload').fadeOut('slow');
                });
                this._notify.showNotification('top', 'left', 'Please Check Your Network Connection', 'warning');
                return;
            }
        });
    }

    getWardTermGeneralComment(): void {
        this._genservice.getWardTermGeneralComment(this.selectClass, this.selectedExamType, this.selectedTerm).subscribe(response => {
            if (response) {
                this.remarks = response;
                $(function () {
                    $('.fade').fadeOut('slow');
                    $('.preload').fadeOut('slow');
                });
            } else {
                $(function () {
                    $('.fade').fadeIn();
                    $('.preload').fadeIn();
                });
            }
        },
        (error) => {
            if (error.status === 0) {
                $(function () {
                    $('.fade').fadeOut('slow');
                    $('.preload').fadeOut('slow');
                });
                this._notify.showNotification('top', 'left', 'Please Check Your Network Connection', 'warning');
                return;
            }
        });
    }

    viewGradeInformation(): void {
        if (this.selectClass == null || this.selectClass == '' || this.selectClass == "" || this.selectClass == 'undefined') {
            this._notify.showNotification('top', 'left', 'Select a Class', 'danger');
            return;
        }
        if (this.selectedTerm == null || this.selectedTerm == '' || this.selectedTerm == "" || this.selectedTerm == 'undefined') {
            this._notify.showNotification('top', 'left', 'Select a Term', 'danger');
            return;
        }
        if (this.selectedExamType == null || this.selectedExamType == '' || this.selectedExamType == 'undefined') {
            this._notify.showNotification('top', 'left', 'Select an Exam Type', 'danger');
            return;
        }
        $(function () {
            $('.fade').fadeIn();
            $('.preload').fadeIn();
        });
        this.SetTime();
        this._genservice
            .getStudentGradeList(this.selectClass, this.selectedTerm, this.selectedExamType)
            .subscribe(
                response => {
                    this.StopTime();
                    this.gradelist = response;
                    if (response.length <= 0) {
                        $(function () {
                            $('.fade').fadeOut('slow');
                            $('.preload').fadeOut('slow');
                        });
                        $(document.querySelector('#BarChart')).css('display', 'none');
                        $(document.querySelector('#HorizontalBar')).css('display', 'none');
                        this.subjectsdetails = [];
                        this._notify.showNotification('top', 'left', 'No Available Records', 'info');
                        return;
                    } else {
                        $(function () {
                            $('.fade').fadeOut('slow');
                            $('.preload').fadeOut('slow');
                        });
                        $(document.querySelector('#BarChart')).css('display', 'block');
                        $(document.querySelector('#HorizontalBar')).css('display', 'block');
                        this._genservice
                            .getSubjectsDetails(this.selectClass, this.selectedTerm, this.selectedExamType)
                            .subscribe(response1 => {
                                this.subjectsdetails = response1;
                            });
                        sessionStorage.setItem('selectClass', this.selectClass);
                        sessionStorage.setItem('selectedTerm', this.selectedTerm);
                        sessionStorage.setItem('selectedExamType', this.selectedExamType);
                        this._genservice.getMyWardClassTermProgress(
                            sessionStorage.getItem('selectClass'),
                            sessionStorage.getItem('selectedTerm'),
                            sessionStorage.getItem('selectedExamType'))
                            .subscribe(response2 => {
                                const NoOnRoll = response2['NoOnRoll'];
                                const ClassAVG = response2['ClassAVG'];
                                const HighestMark = response2['HighestMark'];
                                const LowestMark = response2['LowestMark'];
                                const clspos = response2['clspos'];
                                this.BarChart = new Chart('BarChart', {
                                    type: 'bar',
                                    data: {
                                        labels: ['Highest Mark', 'Class Average', 'Lowest Mark', 'Ward`s Score'],
                                        datasets: [
                                            {
                                                label: 'Score Averages',
                                                backgroundColor: [
                                                    'rgba(75, 192, 192, 0.2)',
                                                    'rgba(255, 159, 64, 0.2)',
                                                    'rgba(255, 99, 132, 0.2)',
                                                    'rgba(153, 102, 255, 0.2)'
                                                ],
                                                borderColor: [
                                                    'rgba(75, 192, 192, 1)',
                                                    'rgba(255, 159, 64, 1)',
                                                    'rgba(255, 99, 132, 1)',
                                                    'rgba(153, 102, 255, 1)'
                                                ],
                                                borderWidth: '1',
                                                data: [HighestMark, ClassAVG, LowestMark, NoOnRoll]
                                            }
                                        ]
                                    },
                                    options: {
                                        title: {
                                            display: true,
                                            text: 'Ward`s Class Term Average',
                                            fontSize: 22,
                                            padding: 20,
                                            position: 'left'
                                        },
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    fontSize: 10
                                                }
                                            }]
                                        }
                                    }
                                });
                            });
                        this._genservice.getExamTermSubjectAnalysis(
                            sessionStorage.getItem('selectClass'),
                            sessionStorage.getItem('selectedExamType'))
                            .subscribe(response3 => {
                                let v;
                                const sub_name = [];
                                const f_term = [];
                                const s_term = [];
                                const t_term = [];
                                for (v = 0; v < response3.length; v++) {
                                    sub_name.push(response3[v].subject);
                                    if (response3[v]['1st Term'] === undefined || '') {
                                        response3[v]['1st Term'] = 0;
                                    }
                                    if (response3[v]['2nd Term'] === undefined || '') {
                                        response3[v]['2nd Term'] = 0;
                                    }
                                    if (response3[v]['3rd Term'] === undefined || '') {
                                        response3[v]['3rd Term'] = 0;
                                    }
                                    f_term.push(response3[v]['1st Term']);
                                    s_term.push(response3[v]['2nd Term']);
                                    t_term.push(response3[v]['3rd Term']);
                                }
                                this.HorizontalBar = new Chart('HorizontalBar', {
                                    type: 'horizontalBar',
                                    data: {
                                        labels: sub_name,
                                        datasets: [
                                            {
                                                label: '1st Term',
                                                backgroundColor: 'rgba(255, 0, 210, 0.2)',
                                                borderColor: 'rgba(255, 0, 210, 1)',
                                                borderWidth: '1',
                                                data: f_term
                                            },
                                            {
                                                label: '2nd Term',
                                                backgroundColor: 'rgba(255, 209, 100, 0.2)',
                                                borderColor: 'rgba(255, 209, 100, 1)',
                                                borderWidth: '1',
                                                data: s_term
                                            },
                                            {
                                                label: '3rd Term',
                                                backgroundColor: 'rgba(88, 197, 112, 0.2)',
                                                borderColor: 'rgba(88, 197, 112, 1)',
                                                borderWidth: '1',
                                                data: t_term
                                            }
                                        ]
                                    },
                                    options: {
                                        title: {
                                            display: true,
                                            text: 'Term Subject Analysis',
                                            fontSize: 22,
                                            padding: 20,
                                            position: 'top'
                                        },
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    fontSize: 10
                                                }
                                            }]
                                        }
                                    }
                                });
                                if (response3) {
                                    $(function () {
                                        $('.fade').fadeOut('slow');
                                        $('.preload').fadeOut('slow');
                                    });
                                }
                            });
                    }
                },
                (error) => {
                    if (error.status === 0) {
                        this.StopTime();
                        $(function () {
                            $('.fade').fadeOut('slow');
                            $('.preload').fadeOut('slow');
                        });
                        this._notify.showNotification('top', 'left', 'Please Check Your Network Connection', 'warning');
                        return;
                    }
                }
            );
    }

    getStudentScores(seletedSubjectcode): void {
        this.SetTime();
        $(function () {
            $('.fade').fadeIn();
            $('.preload').fadeIn();
            $('#DynamicTableData').remove();
        });
        this._genservice
            .getStudentScores(this.selectClass, this.selectedTerm, this.selectedExamType, seletedSubjectcode)
            .subscribe(response => {
                    this.studentscores = response;
                    if (response || $('#DynamicTableData').remove()) {
                        this.StopTime();
                        $(function () {
                            $('.fade').fadeOut();
                            $('.preload').fadeOut();
                        });
                    }
                    // CLASS WORK
                    const tabWork = $('#contentWork');
                    tabWork.html('');
                    let tab_contentWork = '<div class="DynamicTableData" ><h5>CLASS WORK</h5><' +
                        'div class="content table-responsive table-full-width"><table class="table">' +
                        '<thead><tr><th>Date</th><th>Class Work ID</th><th>Score</th></tr></thead><tbody>';
                    $.each(response, function (index, object) {
                        if (object.sz_type === 'CW:CLASS WORK') {
                            tab_contentWork = tab_contentWork + '<tr><td>' + object.sz_date + '</td><td>'
                                + object.sz_subcount + '</td><td>' + object.szmarks + '</td></tr>';
                        }
                    });
                    tab_contentWork = tab_contentWork + '</tbody></table></div></div>';
                    tabWork.append(tab_contentWork);
                    // CLASS TEST
                    const tabTest = $('#contentTest');
                    tabTest.html('');
                    let tab_contentTest = '<div class="DynamicTableData" ><h5>CLASS TEST</h5>' +
                        '<div class="content table-responsive table-full-width"><table class="table">' +
                        '<thead><tr><th>Date</th><th>Class Test ID</th><th>Score</th></tr></thead><tbody>';
                    $.each(response, function (index, object) {
                        if (object.sz_type === 'CT:CLASS TEST') {
                            tab_contentTest = tab_contentTest + '<tr><td>' + object.sz_date + '</td><td>' +
                                object.sz_subcount + '</td><td>' + object.szmarks + '</td></tr>';
                        }
                    });
                    tab_contentTest = tab_contentTest + '</tbody></table></div></div>';
                    tabTest.append(tab_contentTest);
                    // HOME WORK
                    const tabHome = $('#contentHome');
                    tabHome.html('');
                    let tab_contentHome = '<div class="DynamicTableData" ><h5>HOME WORK</h5>' +
                        '<div class="content table-responsive table-full-width"><table class="table">' +
                        '<thead><tr><th>Date</th><th>Home Work ID</th><th>Score</th></tr></thead><tbody>';
                    $.each(response, function (index, object) {
                        if (object.sz_type === 'HW:HOME WORK') {
                            tab_contentHome = tab_contentHome + '<tr><td>' + object.sz_date + '</td><td>' +
                                object.sz_subcount + '</td><td>' + object.szmarks + '</td></tr>';
                        }
                    });
                    tab_contentHome = tab_contentHome + '</tbody></table></div></div>';
                    tabHome.append(tab_contentHome);
                    // PROJECT
                    const tabProject = $('#contentProject');
                    tabProject.html('');
                    let tab_contentProject = '<div class="DynamicTableData" ><h5>PROJECT</h5>' +
                        '<div class="content table-responsive table-full-width"><table class="table">' +
                        '<thead><tr><th>Date</th><th>Project Work ID</th><th>Score</th></tr></thead><tbody>';
                    $.each(response, function (index, object) {
                        if (object.sz_type === 'P:PROJECT') {
                            tab_contentProject = tab_contentProject + '<tr><td>' + object.sz_date + '</td><td>' +
                                object.sz_subcount + '</td><td>' + object.szmarks + '</td></tr>';
                        }
                    });
                    tab_contentProject = tab_contentProject + '</tbody></table></div></div>';
                    tabProject.append(tab_contentProject);
                    // FINAL EXAM
                    const tabExam = $('#contentExam');
                    tabExam.html('');
                    let tab_contentExam = '<div class="DynamicTableData" ><h5>FINAL EXAM</h5>' +
                        '<div class="content table-responsive table-full-width"><table class="table">' +
                        '<thead><tr><th>Date</th><th>Final Exam</th><th>Score</th></tr></thead><tbody>';
                    $.each(response, function (index, object) {
                        if (object.sz_type === 'FE:FINAL EXAM') {
                            tab_contentExam = tab_contentExam + '<tr><td>' + object.sz_date + '</td><td>' +
                                object.sz_subcount + '</td><td>' + object.szmarks + '</td></tr>';
                        }
                    });
                    tab_contentExam = tab_contentExam + '</tbody></table></div></div>';
                    tabExam.append(tab_contentExam);
                },
                (error) => {
                    if (error.status === 0) {
                        $(function () {
                            this.StopTime();
                            $('.fade').fadeOut('slow');
                            $('.preload').fadeOut('slow');
                        });
                        this._notify.showNotification('top', 'left', 'Please Check Your Network Connection', 'danger');
                        return;
                    }
                }
            );
    }

}


















