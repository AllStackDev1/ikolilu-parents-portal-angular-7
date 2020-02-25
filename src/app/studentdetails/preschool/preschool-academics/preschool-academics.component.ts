import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AcademicYears} from 'app/acayear';
import {StudentClass} from 'app/StudentClass';
import {GeneralService} from 'app/general.service';
import {NotifyService} from 'app/notify.service';
import {ExamTypes} from 'app/examtypes';
import {GradeLists} from 'app/gradelist';
import {IMyDpOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { WardTermTeacherComment } from 'app/wardtermteachercomment';
import { WardTermGeneralRemarks } from 'app/wardtermremarkscomment';
import { PreschoolGrades } from 'app/preschoolgrades';

@Component({
  selector: 'app-preschool-academics',
  templateUrl: './preschool-academics.component.html',
  styleUrls: ['./preschool-academics.component.css']
})
export class PreschoolAcademicsComponent implements OnInit {
    currentPage = '';
    acayears: AcademicYears[];
    selectedTerm: string;

    szclasses: StudentClass[];
    selectClass: string;

    examtypes: ExamTypes[];
    selectedExamType: string;

    gradelist: GradeLists[];

    _date: any;
    dailyreportA = [];
    dailyreportB = [];
    preschoolGrades: PreschoolGrades[];
    gradeData = [];
    teacherscomment: WardTermTeacherComment[];
    remarks: WardTermGeneralRemarks[];
    teacher_comment: string;
    parent_comment: string;
    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd.mm.yyyy',
        alignSelectorRight: true,
        showClearDateBtn: false
    };
    setTime: any;
    selDate: IMyDate = {year: 0, month: 0, day: 0};
   GuardianForm: FormGroup;

    constructor(
        private activatedRouter: ActivatedRoute,
        private _genservice: GeneralService,
        private  fb: FormBuilder,
        private _notify: NotifyService
    ) {
        const d: Date = new Date();
        this.selDate = {
            year: d.getFullYear(),
            day: d.getDate(),
            month: d.getMonth() + 1,
        };
        this.GuardianForm = this.fb.group({
            'comment': ['', Validators.required],
        });
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
        if (this.currentPage === '/preschool') {
            // this.viewGradeInformation();
            this.getStudentAcaYear();
            this.getStudentClass();
            this.getStudentExamTypes();
            this.getWardTermTeachersComment();
            this.getWardTermGeneralComment();
            this._genservice.stageTitle = sessionStorage.getItem('studentName').toUpperCase();
            const newDate = this.selDate['month'] + '/' + this.selDate['day'] + '/' + this.selDate['year'];
            this._date = new Date(newDate).getTime();
            this.getPreschoolGrades();
            // this.getPreSchoolDailyReport(this._date);
        }
    }

    SetTime() {
        this.setTime = setTimeout(function(){ alert('Slow Network Connection...'); }, 5000);
    }

    StopTime() {
        clearTimeout(this.setTime);
    }

    getStudentAcaYear(): void {
        this.SetTime();
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

    getPreschoolGrades(): void {
        this.SetTime();
        
        const sz_wardid = sessionStorage.getItem('studentid');
        const szschoolid = sessionStorage.getItem('schoolid');
        const szclassid = sessionStorage.getItem('currentClass');
        const sz_term = sessionStorage.getItem('currentTerm');

        this._genservice.getPreschoolGrades(sz_wardid,szschoolid,szclassid,sz_term).subscribe(response => {
                if (response) {
                    this.preschoolGrades = response;
                    this.StopTime();
                    $(function () {
                        $('.fade').fadeOut('slow');
                        $('.preload').fadeOut('slow');
                    });
                    let gradeData = [];
                    response.reduce(function (r, a) {
                        r[a.szsubjectidname] = r[a.szsubjectidname] || [];
                        if(!gradeData.includes(r[a.szsubjectidname])){
                            gradeData.push(r[a.szsubjectidname]);
                        }
                        r[a.szsubjectidname].push(a);
                        return r;
                    }, Object.create(null));
                    this.gradeData = gradeData
                    console.log(this.gradeData);
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
                        this.StopTime();
                        $('.fade').fadeOut('slow');
                        $('.preload').fadeOut('slow');
                    });
                    this._notify.showNotification('top', 'left', 'Please Check Your Network Connection', 'warning');
                    this.getPreschoolGrades();
                }
            }
        );
    }

    getStudentClass(): void {
        this.SetTime();
        this._genservice.getStudentClasses().subscribe(response => {
                if (response) {
                    this.StopTime();
                    this.szclasses = response;
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
        this.SetTime();
        this._genservice.getStudentExamTypes().subscribe(response => {
                if (response) {
                    this.examtypes = response;
                    this.StopTime();
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
                        this.StopTime();
                        $('.fade').fadeOut('slow');
                        $('.preload').fadeOut('slow');
                    });
                    this._notify.showNotification('top', 'left', 'Please Check Your Network Connection', 'warning');
                    return;
                }
            });
    }

    // viewGradeInformation(): void {
    //     if (this.selectClass == null || this.selectClass == '' || this.selectClass == "" || this.selectClass == 'undefined') {
    //         this._notify.showNotification('top', 'left', 'Select a Class', 'danger');
    //         return;
    //     }
    //     if (this.selectedTerm == null || this.selectedTerm == '' || this.selectedTerm == "" || this.selectedTerm == 'undefined') {
    //         this._notify.showNotification('top', 'left', 'Select a Term', 'danger');
    //         return;
    //     }
    //     if (this.selectedExamType == null || this.selectedExamType == '' || this.selectedExamType == 'undefined') {
    //         this._notify.showNotification('top', 'left', 'Select an Exam Type', 'danger');
    //         return;
    //     }
    //     $(function () {
    //         $('.fade').fadeIn();
    //         $('.preload').fadeIn();
    //     });

    //     this.SetTime();

    //     // this._genservice.getPreSchoolSubjectRemarks(this.selectClass, this.selectedExamType, this.selectedTerm).subscribe(
    //     //     response => {
    //     //         if (response) {
    //     //             this.StopTime();
    //     //         }
    //     //         this.gradelist = response;
    //     //         $(function () {
    //     //             $('.fade').fadeOut('slow');
    //     //             $('.preload').fadeOut('slow');
    //     //         });
    //     //     },
    //     //     (error) => {
    //     //         if (error.status === 0) {
    //     //             $(function () {
    //     //                 $('.fade').fadeOut('slow');
    //     //                 $('.preload').fadeOut('slow');
    //     //             });
    //     //             this._notify.showNotification('top', 'left', 'Please Check Your Network Connection', 'warning');
    //     //             return;
    //     //         }
    //     //     });
    // }

    // onDateChanged(event: IMyDateModel) {
    //     this.dailyreportA = [];
    //     this.dailyreportB = [];
    //     this.selDate = event.date;
    //     this._date = event.epoc;
    //     this.getPreSchoolDailyReport(this._date);
    // }

    // getPreSchoolDailyReport(_date) {
    //     this.SetTime();
    //     $(function () {
    //         $('.fade').fadeIn();
    //         $('.preload').fadeIn();
    //     });
    //     this._genservice.getPreSchoolDailyReport(sessionStorage.getItem('currentClass'), _date).subscribe(
    //         response => {
    //             this.StopTime();
    //             this.teacher_comment = response[response.length - 1].teacher_comment;
    //             let v = 0;
    //             while (v < response.length) {
    //                 if (v % 2 === 0) {
    //                     this.dailyreportA.push({
    //                         title: response[v].title,
    //                         comment: response[v].comment
    //                     });
    //                 } else {
    //                     this.dailyreportB.push({
    //                         title: response[v].title,
    //                         comment: response[v].comment
    //                     });
    //                 }
    //                 v++;
    //             }
    //             $(function () {
    //                 $('.fade').fadeOut('slow');
    //                 $('.preload').fadeOut('slow');
    //             });
    //         },
    //         (error) => {
    //             if (error.status === 0) {
    //                 $(function () {
    //                     $('.fade').fadeOut('slow');
    //                     $('.preload').fadeOut('slow');
    //                 });
    //                 this._notify.showNotification('top', 'left', 'Please Check Your Network Connection!', 'warning');
    //                 return;
    //             }
    //         }
    //     );
    // }

    // OnSubmitParentComment(value) {
    //     this.parent_comment = value.comment;
    //     const name = sessionStorage.getItem('name');
    //     const useremail = sessionStorage.getItem('email');
    //     const studentid = sessionStorage.getItem('studentid');
    //     const schoolid = sessionStorage.getItem('schoolid');
    //     const formData: FormData = new FormData();
    //     formData.append('name', name);
    //     formData.append('email', useremail);
    //     formData.append('comment', value.comment);
    //     formData.append('sz_wardid', studentid);
    //     formData.append('szschoolid', schoolid);
    //     // this._genservice.postComment(formData).subscribe(response => {
    //     //     if (response.status === 'success') {
    //     //         this._notify.showNotification('top', 'left', 'Comment Successfully Posted!', 'success');
    //     //         return;
    //     //     }else {
    //     //         this._notify.showNotification('top', 'left', 'Error While Posting Comment!', 'danger');
    //     //         return;
    //     //     }
    //     // },
    //     // (error) => {
    //     //     if (error.status === 0) {
    //     //         $(function() {
    //     //             $('.fade').fadeOut('slow');
    //     //             $('.preload').fadeOut('slow');
    //     //         });
    //     //         this._notify.showNotification('top', 'left', 'Please Check Your Network Connection!', 'warning');
    //     //         return;
    //     //     }
    //     // });
    // }

    getWardTermTeachersComment(): void {
        this._genservice.getWardTermTeachersComment(this.selectClass, this.selectedExamType, this.selectedTerm).subscribe(response => {
            if (response) {
                this.teacherscomment = response;
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
}



















