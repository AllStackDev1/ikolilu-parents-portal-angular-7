import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { StudentinfoComponent } from './studentdetails/studentinfo/studentinfo.component';
import { PreschoolComponent } from './studentdetails/preschool/preschool.component';

const routes: Routes = [
    { path: 'getting-started',  component: GettingStartedComponent},
    { path: 'dashboard',        component: DashboardComponent },
    { path: 'studentinfo',      component: StudentinfoComponent },
    { path: 'preschool',        component: PreschoolComponent },
    { path: '',                 redirectTo: 'getting-started', pathMatch: 'full' },
    { path: '**',               redirectTo: 'getting-started', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
