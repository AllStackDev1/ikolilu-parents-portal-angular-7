import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from 'ng-fullcalendar';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent} from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { WardlistComponent } from './wardlist/wardlist.component';
import { StudentinfoComponent } from './studentdetails/studentinfo/studentinfo.component';

import { BillpaymentsComponent } from './studentdetails/billpayments/billpayments.component';
import { AssignmentmanagerComponent } from './studentdetails/assignmentmanager/assignmentmanager.component';
import { LessonplannerComponent } from './studentdetails/lessonplanner/lessonplanner.component';
import { StudentacademicsComponent } from './studentdetails/studentacademics/studentacademics.component';
import { GeneralService } from './general.service';
import { NotifyService } from './notify.service';
import { AddNewWardComponent } from './add-new-ward/add-new-ward.component';
import { PreschoolComponent } from './studentdetails/preschool/preschool.component';
import { PreschoolAcademicsComponent } from './studentdetails/preschool/preschool-academics/preschool-academics.component';
import { PaymentswizardComponent } from './studentdetails/paymentswizard/paymentswizard.component';
import { MycalendarComponent } from './studentdetails/mycalendar/mycalendar.component';
import { WardattendanceComponent } from './studentdetails/wardattendance/wardattendance.component';
import { AcademicsinfoComponent } from './studentdetails/academicsinfo/academicsinfo.component';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GettingStartedComponent,
    WardlistComponent,
    StudentinfoComponent,
    BillpaymentsComponent,
    AssignmentmanagerComponent,
    LessonplannerComponent,
    StudentacademicsComponent,
    AddNewWardComponent,
    PaymentswizardComponent,
    MycalendarComponent,
    WardattendanceComponent,
    AcademicsinfoComponent,
    PreschoolComponent,
    PreschoolAcademicsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    FullCalendarModule,
    MyDatePickerModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, GeneralService, NotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
