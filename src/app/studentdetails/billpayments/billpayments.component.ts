import { Component, OnInit } from '@angular/core';
import { StudentClass } from '../../StudentClass';
import { GeneralService } from '../../general.service';
import { BillsPayments } from '../../billpayments';
import { BilllHistory } from '../../billhistory';
import { NotifyService } from '../../notify.service';

@Component({
  selector: 'app-billpayments',
  templateUrl: './billpayments.component.html',
  styleUrls: ['./billpayments.component.css']
})
export class BillpaymentsComponent implements OnInit {
  szbill: number;
  szpayments: number;
  szbalances: number;
  szresponse: string;

  szbilltotal: number;
  szpaymentotal: number;
  szbalancetotal: number;

  billpaylist: BillsPayments[];

  szclasses: StudentClass[];
  selectClass: string;
  selectedTerm: string;

  billHistory: BilllHistory[];
  billitemid: string;
  currency: string;
  setTime: any;

constructor( private _genservice: GeneralService, private _notify: NotifyService ) { }
  ngOnInit() {
    this.selectClass = sessionStorage.getItem('currentClass');
    this.selectedTerm = sessionStorage.getItem('currentTerm');
    this.getStudentClass();
    this.viewBillPayInfo();
    this.szbilltotal  = 0;
    this.szpaymentotal  = 0;
    this.szbalancetotal  = 0;

    this.szbill = 0;
    this.szpayments = 0;
    this.szbalances = 0;
    this.getStudentPaymentHistory();
  }
  
  SetTime() {
    this.setTime = setTimeout(function(){ alert('Slow Network Connection...'); }, 5000);
  }

  StopTime() {
    clearTimeout(this.setTime);
  }

  getStudentClass(): void {
    this._genservice.getStudentClasses().subscribe(response => { this.szclasses = response; });
  }

  viewBillPayInfo(): void {

    if (this.selectClass == null ||  this.selectClass == '' || this.selectClass == "" || this.selectClass  == 'undefined') {
        this._notify.showNotification('top', 'left', 'No Class Selected', 'danger');
        return;
    }
    if (this.selectedTerm == null ||  this.selectedTerm == '' || this.selectedTerm == "" || this.selectedTerm  == 'undefined') {
        this._notify.showNotification('top', 'left', 'No Term Selected', 'danger');
        return;
    }
    sessionStorage.setItem('currentTerm', this.selectedTerm);
    this.viewBillSummary();
    $(function() {
      $('.fade').fadeIn();
      $('.preload').fadeIn();
    });
    this._genservice.getStudentBillsPayments(
        this.selectedTerm.toLowerCase(),
        this.selectClass).subscribe(response => {
          this.billpaylist = response;
          this.currency = response['0']['symbol'];
          this.billitemid = '00001-9';
        });
  }

  viewBillSummary(): void {
    this._genservice.getStudentSummary(this.selectedTerm.toLowerCase(), this.selectClass).subscribe(response => {

      if(response.length === 0 || response.length <= 0 ) {
        $(function() {
          $('.fade').fadeOut('slow');
          $('.preload').fadeOut('slow');
        });
        this._notify.showNotification('top', 'left', 'No Records for selected period', 'info');
        return;
      } else {
      this.szresponse = JSON.parse(JSON.stringify(response[0]));
      const data = JSON.parse(JSON.stringify(response[0]));

      if(data === null || data === 'undefined' || data === '') {} else {
        this.szbill = data.debit;
        this.szpayments = data.credit;
        this.szbalances = data.balance;
      }
    }
      $(function() {
        $('.fade').fadeOut('slow');
        $('.preload').fadeOut('slow');
      });
    });
  }

  getStudentPaymentHistory(): void {
    this._genservice.getStudentBillsPaymentsHistory().subscribe(response => {

      if(response.length === 0 || response.length <= 0 )
      {
        this._notify.showNotification('top', 'left', 'No Records for selected period', 'info');
        this.billHistory = null;
      } else {

        this.billHistory = response;
    }

    });
  }


}
