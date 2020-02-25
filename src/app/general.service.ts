import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs';

import { AcademicYears } from './acayear';
import { StudentClass } from './StudentClass';
import { ExamTypes } from './examtypes';
import { GradeLists } from './gradelist';
import { BillsPayments } from './billpayments';
import { BilllHistory } from './billhistory';
import { SchoolList } from './schools';
import { SchoolCalendar } from './calendar';
import { StudentScoresInfo } from './StudentScoresInfo';
import { SubjectsDetails } from './subjectsdetails';
import { ClassTermProgress } from './classtermprogress';
import { ExamTermSubjectAnalysis } from './examtermsubjectanalysis';
import { DailyReport } from './dailyreport';
import { WardTermTeacherComment } from './wardtermteachercomment';
import { WardTermGeneralRemarks } from './wardtermremarkscomment';
import { PreschoolGrades } from './preschoolgrades';

@Injectable()
export class GeneralService {

  public stageTitle: string;
  public apiPath = 'https://www.ikolilu.com/api/v1.0/portal.php/';
  public apiStudentsPortalapiPath = 'https://www.ikolilu.com/api/v1.0/studentsportalapi.php/';
  constructor(private http: Http) { }

  public getYearByAcademic(): Observable<AcademicYears[]> {
    const localPath = this.apiPath + 'GetYearForAcademics/';
    const studentid = sessionStorage.getItem('studentid');
    const schoolid  = sessionStorage.getItem('schoolid');

     return this.http.get(localPath, { params: {sz_wardid: studentid, szschoolid: schoolid }}).map(res => res.json());
  }
  public getStudentClasses(): Observable<StudentClass[]> {
    const localPath = this.apiPath + 'GetStudentClass/"';
    const studentid = sessionStorage.getItem('studentid');

    return this.http.get(localPath, { params: {sz_wardid: studentid }}).map(res => res.json());
  }
  public getStudentExamTypes(): Observable<ExamTypes[]> {
    const localPath = this.apiPath + 'getExamType/';
    const schoolid  = sessionStorage.getItem('schoolid');

    return this.http.get(localPath, { params: { szschoolid: schoolid }}).map(res => res.json());
  }
  public getStudentGradeList( szclass: string, szterm: string, szexamtype: string ): Observable<GradeLists[]> {
     const localPath = this.apiPath + 'GetMyWardGradesInformation/';
     const studentid = sessionStorage.getItem('studentid');
     const schoolid  = sessionStorage.getItem('schoolid');
     return this.http.get(localPath, {
       params: {
           sz_wardid: studentid,
           szschoolid: schoolid,
           szclassid: szclass,
           sz_term: szterm,
           sz_examtype: szexamtype
       }
     }).map(res => res.json());
    }
  public getPreSchoolSubjectRemarks(selectClass, selectedExamType, selectedTerm): Observable<GradeLists[]> {
    const localPath = 'http://localhost/iKolilu/studentportal/v1.2/api/studentportalapi_.php/GetPreSchoolSubjectRemarks/';
    const studentid = sessionStorage.getItem('studentid');
    const schoolid  = sessionStorage.getItem('schoolid');
    return this.http.get(localPath, {params: {
      sz_wardid: studentid,
          szschoolid: schoolid,
          szclassid: selectClass,
          sz_examtype: selectedExamType,
          sz_term: selectedTerm
    }}).map(res => res.json());
  }
  public getPreSchoolDailyReport(selectClass, timestamp): Observable<DailyReport[]> {
    const localPath = 'http://localhost/iKolilu/studentportal/v1.2/api/studentportalapi_.php/GetPreSchoolDailyReport/';
    const studentid = sessionStorage.getItem('studentid');
    const schoolid  = sessionStorage.getItem('schoolid');
    return this.http.get(localPath, { params: {
      sz_wardid: studentid,
      szschoolid: schoolid,
      szclassid: selectClass,
      sztimestamp: timestamp,
    }}).map(res => res.json());
  }
  public getStudentBillsPayments(szterm: string, szclass: string): Observable<BillsPayments[]> {
    const localPath = this.apiPath + 'GetMyWardBillsAndPayments/';
    const studentid = sessionStorage.getItem('studentid');
    const schoolid  = sessionStorage.getItem('schoolid');
    return this.http.get(localPath, { params: {
      sz_wardid: studentid,
      szschoolid: schoolid,
      szclassid: szclass,
      sz_term: szterm }
    }).map(res => res.json());
  }
  public getStudentBillsPaymentsHistory(): Observable<BilllHistory[]> {
    const localPath = this.apiPath + 'GetMyWardBillsAndPaymentHistory/';
    const studentid = sessionStorage.getItem('studentid');
    const schoolid  = sessionStorage.getItem('schoolid');
    return this.http.get(localPath, { params: {  sz_wardid: studentid, szschoolid: schoolid }}).map(res => res.json());
  }
  public getCalendar(): Observable<SchoolCalendar[]> {
    const localPath = this.apiPath + 'GetSchoolCalendar/';
    const schoolid  = sessionStorage.getItem('schoolid');
    return this.http.get(localPath, { params: {  szschoolid: schoolid }}).map(res => res.json());
  }
  public getStudentSummary(szterm: string, szclass: string): Observable<string> {
    const localPath = this.apiPath + 'GetWardSummary/';
    const studentid = sessionStorage.getItem('studentid');
    const schoolid  = sessionStorage.getItem('schoolid');

    return this.http.get(localPath, { params: {  sz_wardid: studentid, szschoolid: schoolid, szclassid: szclass, sz_term: szterm }})
               .map(res => res.json());
  }
  public getNotifications(schools: string) {
    const localPath = this.apiPath + 'GetNotices/';
    return this.http.get(localPath, { params: {  szschoolid: schools }})
    .map(res => res.json());
  }
  public listSchools(): Observable<SchoolList[]> {

      const localPath = this.apiPath + 'ListSchools/';

      return this.http.get(localPath, { }).map(res => res.json());
  }
  public getSubjectsDetails(selectClass, selectedTerm, selectedExamType): Observable<SubjectsDetails[]> {
    const studentid = sessionStorage.getItem('studentid');
    const schoolid  = sessionStorage.getItem('schoolid');
    const localPath = this.apiPath + 'GetClassSubjects/';

    return this.http.get(localPath, {
      params: {
        sz_wardid: studentid,
        szclassid: selectClass,
        sz_term: selectedTerm,
        szschoolid: schoolid,
        sz_examtype: selectedExamType
      }
    }).map(res => res.json());
  }
  public getStudentScores(selectClass, selectedTerm, selectedExamType, seconstedSubjectcode): Observable<StudentScoresInfo[]> {
    const studentid = sessionStorage.getItem('studentid');
    const schoolid  = sessionStorage.getItem('schoolid');
    const localPath = this.apiPath + 'GetStudentScores/';
    return this.http.get(localPath, {
          params: {
            sz_wardid: studentid,
            szclassid: selectClass,
            sz_term: selectedTerm,
            szschoolid: schoolid,
            sz_examtype: selectedExamType,
            sz_subjectcode: seconstedSubjectcode
          }
        }).map(res => res.json());
  }
  public getMyWardClassTermProgress(selectClass, selectedTerm, selectedExamType): Observable<ClassTermProgress[]> {
    const studentid = sessionStorage.getItem('studentid');
    const schoolid  = sessionStorage.getItem('schoolid');
    const localPath = this.apiPath + 'GetMyWardClassTermProgress/';

    return this.http.get(localPath, {
      params: {
        sz_wardid: studentid,
        szclassid: selectClass,
        sz_term: selectedTerm,
        szschoolid: schoolid,
        sz_examtype: selectedExamType
      }
    }).map(res => res.json());
  }
  public getExamTermSubjectAnalysis(selectClass, selectedExamType): Observable<ExamTermSubjectAnalysis[]> {
    const studentid = sessionStorage.getItem('studentid');
    const schoolid  = sessionStorage.getItem('schoolid');
    const localPath = this.apiPath + 'GetExamTermSubjectAnalysis/';

    return this.http.get(localPath, {
      params: {
        sz_wardid: studentid,
        szclassid: selectClass,
        szschoolid: schoolid,
        sz_examtype: selectedExamType
      }
    }).map(res => res.json());
  }
  public getWardTermTeachersComment(selectClass, selectedExamType, selectedTerm): Observable<WardTermTeacherComment[]> {
    const studentid = sessionStorage.getItem('studentid');
    const schoolid  = sessionStorage.getItem('schoolid');
    const localPath = this.apiPath + 'GetWardTermSubjectComment/';

    return this.http.get(localPath, {
      params: {
        sz_wardid: studentid,
        szclassid: selectClass,
        sz_term: selectedTerm,
        szschoolid: schoolid,
        sz_examtype: selectedExamType
      }
    }).map(res => res.json());
  }
  public getWardTermGeneralComment(selectClass, selectedExamType, selectedTerm): Observable<WardTermGeneralRemarks[]> {
    const studentid = sessionStorage.getItem('studentid');
    const schoolid  = sessionStorage.getItem('schoolid');
    const localPath = this.apiPath + 'GetWardTermComment/';

    return this.http.get(localPath, {
      params: {
        sz_wardid: studentid,
        szclassid: selectClass,
        sz_term: selectedTerm,
        szschoolid: schoolid,
        sz_examtype: selectedExamType
      }
    }).map(res => res.json());
  }
  public getMyWards() {
    const email = sessionStorage.getItem('email');
    const localPath = this.apiPath + 'GetMyWards/';
    return this.http.get(localPath, {params: {useremail: email}}).map(res => res.json());
  }
  public findMyWards() {
    const phonenumber = sessionStorage.getItem('phonenumber');
    const localPath = this.apiPath + 'FindMyWards/';
    return this.http.get(localPath, {params: {sz_userphoneno: phonenumber}}).map(res => res.json());
  }
  public addWardsToFile(array) {
    const localPath = this.apiPath + 'AddWardsToFile/?wardInfo=' + JSON.stringify(array);
    return this.http.get(localPath).map(res => res.json());
  }
  // public addWard(fb) {
  //     const localPath = this.apiPath + 'VerifyParent/';
  //     return this.http.post(localPath, fb).map(res => res.json());
  // }
  public mtnMOMO(szterm, szacayear, szclass, msisdn, network, billitem,
    billitemname, szamount, studentname, payee, studentid, school) {
      const localPath = 'https://www.ikolilu.com:23000/MTNMomoPay?network='
       + network + '&msisdn=' + msisdn + '&szterm=' + szterm + '&szacayear='
       + szacayear + '&studentid=' + studentid + '&studentname=' + studentname +
       '&szclass=' + szclass + '&billitem=' + billitem + '&billitemname='
       + billitemname + '&szamount=' + szamount + '&payee=' + payee + '&school=' + school;
      return this.http.get(localPath, {}).map(res => res.json());
  }
  public postComment(formData) {
      const localPath = this.apiPath + 'ParentDailyReportComment/';
      return this.http.post(localPath, formData).map(res => res.json());
  }
  public getPreschoolGrades(sz_wardid, szschoolid, szclassid, sz_term): Observable<PreschoolGrades[]>  {
    const params = {
      sz_wardid,
      szschoolid,
      szclassid,
      sz_term
    };
    const localPath = this.apiStudentsPortalapiPath + 'getPreschoolGrades/';
    return this.http.get(localPath, {params}).map(res => res.json());
  }

}

