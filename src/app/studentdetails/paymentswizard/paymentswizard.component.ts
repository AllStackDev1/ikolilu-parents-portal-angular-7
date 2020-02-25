import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../general.service';
import { NotifyService } from '../../notify.service';


@Component({
  selector: 'app-paymentswizard',
  templateUrl: './paymentswizard.component.html',
  styleUrls: ['./paymentswizard.component.css']
})
export class PaymentswizardComponent implements OnInit {
  cardtype: string;
  cardname: string;
  cardnumber: string;
  expirationdate: string;
  cardcvv: string;
  card_amt: any;
  mmtype: string;
  cellnumber: string;
  mm_amt: any;
  mm_name:string;
  bankfrom: string;
  acc_number_from: string;
  bankto: string;
  acc_number_to: string;
  bank_amt: string;
  ward_name: string;
  ward_id: string;
  ward_school_id: string;
  ward_school_bank_name: string;
  ward_school_bank_acc_no: string;
  paying_item: string;
  paying_amount: string;
  wallet: string;
  item_id: string;
  currency: string;
  setTime: any;
  public visible = false;
  public visibleAnimate = false;
  constructor(private _genservice: GeneralService,private _notify: NotifyService) { }

  ngOnInit() {
  }

  SetTime() {
    this.setTime = setTimeout(function(){ alert('Slow Network Connection...'); }, 5000);
  }

  StopTime() {
    clearTimeout(this.setTime);
  }

  public show(currency, amount, billitem, billitemid): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
    $(document.querySelector('#tab1')).addClass('active');
    $(document.querySelector('#tab2')).removeClass('active');
    $(document.querySelector('#tab3')).removeClass('active');
    $(document.querySelector('#tab_2')).css('display', 'none');
    $(document.querySelector('#tab_3')).css('display', 'none');

    this.card_amt = parseInt(amount, 10);
    this.mm_amt = parseInt(amount, 10);
    this.paying_item = billitem;
    this.item_id = billitemid;
    this.mm_name = sessionStorage.getItem('name');
    this.currency = currency;
  }
  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
    $(document.querySelector('#tab_1')).addClass('active');
    $(document.querySelector('#tab_2')).removeClass('active');
    $(document.querySelector('#tab_3')).removeClass('active');
    $(document.querySelector('#next')).css('display', 'none');
    $(document.querySelector('#back')).css('display', 'none');
    $(document.querySelector('#finish')).css('display', 'none');

  }
  public method(payment_method): void {
    sessionStorage.setItem('payment_method', payment_method);
    $(document.querySelector('#tab_1')).removeClass('active');
    $(document.querySelector('#tab_2')).css('display', 'block').addClass('active');
    if (payment_method === 1) {
      $(document.querySelector('#card-method')).css('display', 'block');
      $(document.querySelector('#etranz-method')).css('display', 'none');
      $(document.querySelector('#mobilemoney-method')).css('display', 'none');
      $(document.querySelector('#banktransfer-method')).css('display', 'none');
      $(document.querySelector('#next')).css('display', 'block').removeClass('disabled');
      $(document.querySelector('#back')).css('display', 'block');
    } else if (payment_method === 2) {
      $(document.querySelector('#etranz-method')).css('display', 'block');
      $(document.querySelector('#card-method')).css('display', 'none');
      $(document.querySelector('#mobilemoney-method')).css('display', 'none');
      $(document.querySelector('#banktransfer-method')).css('display', 'none');
      $(document.querySelector('#next')).css('display', 'block').addClass('disabled');
      $(document.querySelector('#back')).css('display', 'block');
    } else if (payment_method === 3) {
      $(document.querySelector('#mobilemoney-method')).css('display', 'block');
      $(document.querySelector('#card-method')).css('display', 'none');
      $(document.querySelector('#etranz-method')).css('display', 'none');
      $(document.querySelector('#banktransfer-method')).css('display', 'none');
      $(document.querySelector('#next')).css('display', 'block').removeClass('disabled');
      $(document.querySelector('#back')).css('display', 'block');
    } else if (payment_method === 4) {
      $(document.querySelector('#banktransfer-method')).css('display', 'block');
      $(document.querySelector('#card-method')).css('display', 'none');
      $(document.querySelector('#etranz-method')).css('display', 'none');
      $(document.querySelector('#mobilemoney-method')).css('display', 'none');
      $(document.querySelector('#next')).css('display', 'block').removeClass('disabled');
      $(document.querySelector('#back')).css('display', 'block');
    }else {
      $(document.querySelector('#card-method')).css('display', 'none');
      $(document.querySelector('#etranz-method')).css('display', 'none');
      $(document.querySelector('#mobilemoney-method')).css('display', 'none');
      $(document.querySelector('#banktransfer-method')).css('display', 'none');
      $(document.querySelector('#next')).css('display', 'none');
      $(document.querySelector('#back')).css('display', 'none');
    }
  }
  onBack() {
    if ($(document.querySelector('#tab_2')).hasClass('active')) {
      $(document.querySelector('#tab_2')).removeClass('active');
      $(document.querySelector('#tab2')).removeClass('active');
      $(document.querySelector('#tab_1')).addClass('active');
      $(document.querySelector('#tab1')).addClass('active');
      $(document.querySelector('#next')).css('display', 'none');
      $(document.querySelector('#back')).css('display', 'none');
    } else if ($(document.querySelector('#tab_3')).hasClass('active')) {
      $(document.querySelector('#tab_3')).removeClass('active');
      $(document.querySelector('#tab3')).removeClass('active');
      $(document.querySelector('#tab_2')).addClass('active');
      $(document.querySelector('#tab2')).addClass('active');
      $(document.querySelector('#finish')).css('display', 'none');
      $(document.querySelector('#next')).css('display', 'block');
    } else {
      //
    }
  }
  onNext() {
    const payment_method = sessionStorage.getItem('payment_method');
    if (payment_method == '1') {
      if (this.cardtype == '' || this.cardtype == "" || this.cardtype == null || this.cardtype  == 'undefined') {
          this._notify.showNotification('top', 'right', 'Please Fill Out All Field With *', 'danger');
        $(document.querySelector('#card-type')).removeClass('success').addClass('error');
        $(document.querySelector('#suc_c_type')).css('display', 'none');
        $(document.querySelector('#err_c_type')).css('display', 'block');
        return;
      }else {
        $(document.querySelector('#card-type')).removeClass('error').addClass('success');
        $(document.querySelector('#err_c_type')).css('display', 'none');
        $(document.querySelector('#suc_c_type')).css('display', 'block');
      }
      if (this.cardname == null ||  this.cardname == '' || this.cardname == "" || this.cardname  == 'undefined') {
        this._notify.showNotification('top', 'right', 'Please Fill Out All Field With *', 'danger');
        $(document.querySelector('#card-name')).removeClass('success').addClass('error');
        $(document.querySelector('#suc_c_name')).css('display', 'none');
        $(document.querySelector('#err_c_name')).css('display', 'block');
        return;
      }else {
        const testcard_name = this.FormChecks('CardNameChecks', this.cardname, '');
        if (!testcard_name) {
          this._notify.showNotification('top', 'right', 'Error Found in Card Name', 'danger');
          $(document.querySelector('#card-name')).removeClass('success').addClass('error');
          $(document.querySelector('#suc_c_name')).css('display', 'none');
          $(document.querySelector('#err_c_name')).css('display', 'block');
          return;
        }else {
          $(document.querySelector('#card-name')).removeClass('error').addClass('success');
          $(document.querySelector('#err_c_name')).css('display', 'none');
          $(document.querySelector('#suc_c_name')).css('display', 'block');
        }
      }
      if (this.card_amt == null || this.card_amt == '' || this.card_amt == 'undefined') {
        this._notify.showNotification('top', 'right', 'Please Fill Out All Field With *', 'danger');
        $(document.querySelector('#card_amt')).removeClass('success').addClass('error');
        $(document.querySelector('#suc_c_amt')).css('display', 'none');
        $(document.querySelector('#err_c_amt')).css('display', 'block');
        return;
      }else {
        const testcard_amt = this.FormChecks('CardAmountChecks', this.card_amt, '');
        if (!testcard_amt) {
          this._notify.showNotification('top', 'right', 'Error! Amount Should Only Contain Numbers!', 'danger');
          $(document.querySelector('#card_amt')).removeClass('success').addClass('error');
          $(document.querySelector('#suc_c_amt')).css('display', 'none');
          $(document.querySelector('#err_c_amt')).css('display', 'block');
          return;
        }else {
          $(document.querySelector('#card_amt')).removeClass('error').addClass('success');
          $(document.querySelector('#err_c_amt')).css('display', 'none');
          $(document.querySelector('#suc_c_amt')).css('display', 'block');
        }
      }
      if (this.cardnumber == null ||  this.cardnumber == '' || this.cardnumber == "" || this.cardnumber  == 'undefined') {
        this._notify.showNotification('top', 'right', 'Please Fill Out All Field With *', 'danger');
        $(document.querySelector('#card-number')).removeClass('success').addClass('error');
        $(document.querySelector('#suc_c_no')).css('display', 'none');
        $(document.querySelector('#err_c_no')).css('display', 'block');
        return;
      }else {
        const testcard_num = this.FormChecks('CardTypeNumberChecks', this.cardtype, this.cardnumber);
        if (!testcard_num) {
          this._notify.showNotification('top', 'right', 'Card Number is Incorrect', 'danger');
          $(document.querySelector('#card-number')).removeClass('success').addClass('error');
          $(document.querySelector('#suc_c_no')).css('display', 'none');
          $(document.querySelector('#err_c_no')).css('display', 'block');
          return;
        }else {
          $(document.querySelector('#card-number')).removeClass('error').addClass('success');
          $(document.querySelector('#err_c_no')).css('display', 'none');
          $(document.querySelector('#suc_c_no')).css('display', 'block');
        }
      }
      if (this.cardcvv == null || this.cardcvv == '' || this.cardcvv == 'undefined') {
        this._notify.showNotification('top', 'right', 'Please Fill Out All Field With *', 'danger');
        $(document.querySelector('#card-cvv')).removeClass('success').addClass('error');
        $(document.querySelector('#suc_c_cvv')).css('display', 'none');
        $(document.querySelector('#err_c_cvv')).css('display', 'block');
        return;
      }else {
        const testcard_num = this.FormChecks('CardCVVchecks', this.cardcvv, '');
        if (!testcard_num) {
          this._notify.showNotification('top', 'right', 'Error in CVS', 'danger');
          $(document.querySelector('#card-cvv')).removeClass('success').addClass('error');
          $(document.querySelector('#suc_c_cvv')).css('display', 'none');
          $(document.querySelector('#err_c_cvv')).css('display', 'block');
          return;
        }else {
          $(document.querySelector('#card-cvv')).removeClass('error').addClass('success');
          $(document.querySelector('#err_c_cvv')).css('display', 'none');
          $(document.querySelector('#suc_c_cvv')).css('display', 'block');
        }
      }
      if (this.expirationdate == null ||  this.expirationdate == '' || this.expirationdate == "" || this.expirationdate  == 'undefined') {
        this._notify.showNotification('top', 'right', 'Please Fill Out All Field With *', 'danger');
        $(document.querySelector('#expiration-date')).removeClass('success').addClass('error');
        $(document.querySelector('#err_e_d')).css('display', 'block');
        return;
      }else {
        const testcard_date = this.FormChecks('CardDateChecks', this.expirationdate, '');
        if (!testcard_date) {
          this._notify.showNotification('top', 'right', 'Error in Card Date', 'danger');
          $(document.querySelector('#expiration-date')).removeClass('success').addClass('error');
          $(document.querySelector('#suc_e_d')).css('display', 'none');
          $(document.querySelector('#err_e_d')).css('display', 'block');
          return;
        }else {
          const cardMM = Number(this.expirationdate.split('/')[0]);
          const cardYY = Number('20' + this.expirationdate.split('/')[1]);
          const D = this.daysInMonth(cardMM, cardYY);
          const cardDate = new Date(cardMM + '/' + D + '/' + cardYY);
          if (new Date(cardDate) < new Date()) {
            this._notify.showNotification('top', 'right', 'Card Has Expired!', 'danger');
            $(document.querySelector('#expiration-date')).removeClass('success').addClass('error');
            $(document.querySelector('#suc_e_d')).css('display', 'none');
            $(document.querySelector('#err_e_d')).css('display', 'block');
            return;
          }else {
            $(document.querySelector('#expiration-date')).removeClass('error').addClass('success');
            $(document.querySelector('#err_e_d')).css('display', 'none');
            $(document.querySelector('#suc_e_d')).css('display', 'block');
          }
        }
      }
      //
      this.ward_name = sessionStorage.getItem('studentName');
      this.ward_id = sessionStorage.getItem('studentid');
      this.ward_school_id = sessionStorage.getItem('schoolid');
      this.ward_school_bank_name = 'Zenith Bank';
      this.ward_school_bank_acc_no = '11002948229';
      this.paying_amount = this.card_amt;
      $(document.querySelector('#confirm-body-mobile-money-method')).css('display', 'none');
      $(document.querySelector('#confirm-body-card-method')).css('display', 'block');
    } else if (payment_method == '2') {
    } else if (payment_method == '3') {
      if (this.mmtype == '' || this.mmtype == "" || this.mmtype == null || this.mmtype  == 'undefined') {
        this._notify.showNotification('top', 'right', 'Please Fill Out All Field With *', 'danger');
        $(document.querySelector('#mmtype')).removeClass('success').addClass('error');
        $(document.querySelector('#suc_mm_type')).css('display', 'none');
        $(document.querySelector('#err_mm_type')).css('display', 'block');
        return;
      }else {
        $(document.querySelector('#mmtype')).removeClass('error').addClass('success');
        $(document.querySelector('#err_mm_type')).css('display', 'none');
        $(document.querySelector('#suc_mm_type')).css('display', 'block');
      }
      if (this.cellnumber == '' || this.cellnumber == "" || this.cellnumber == null || this.cellnumber  == 'undefined') {
        this._notify.showNotification('top', 'right', 'Please Fill Out All Field With *', 'danger');
        $(document.querySelector('#cell-number')).removeClass('success').addClass('error');
        $(document.querySelector('#suc_cell_no')).css('display', 'none');
        $(document.querySelector('#err_cell_no')).css('display', 'block');
        return;
      }else {
        if (this.cellnumber.length < 10) {
          this._notify.showNotification('top', 'right', 'Error! Please Check Cell Number.', 'danger');
          $(document.querySelector('#cell-number')).removeClass('success').addClass('error');
          $(document.querySelector('#suc_cell_no')).css('display', 'none');
          $(document.querySelector('#err_cell_no')).css('display', 'block');
          return;
        } else {
          const testC_no = this.FormChecks('MMCellNoChecks', this.cellnumber, '');
          if (!testC_no) {
            this._notify.showNotification('top', 'right', 'Error! Invalid Cell Number.', 'danger');
            $(document.querySelector('#cell-number')).removeClass('success').addClass('error');
            $(document.querySelector('#suc_cell_no')).css('display', 'none');
            $(document.querySelector('#err_cell_no')).css('display', 'block');
            return;
          } else {
            $(document.querySelector('#cell-number')).removeClass('error').addClass('success');
            $(document.querySelector('#err_cell_no')).css('display', 'none');
            $(document.querySelector('#suc_cell_no')).css('display', 'block');
          }
        }
      }
      if (this.mm_name == '' || this.mm_name == "" || this.mm_name == null || this.mm_name  == 'undefined') {
        this._notify.showNotification('top', 'right', 'Please Fill Out All Field With *', 'danger');
        $(document.querySelector('#mm-name')).removeClass('success').addClass('error');
        $(document.querySelector('#suc_mm_name')).css('display', 'none');
        $(document.querySelector('#err_mm_name')).css('display', 'block');
        return;
      }else {
        $(document.querySelector('#mm-name')).removeClass('error').addClass('success');
        $(document.querySelector('#err_mm_name')).css('display', 'none');
        $(document.querySelector('#suc_mm_name')).css('display', 'block');
      }
      if (this.mm_amt == '' || this.mm_amt == "" || this.mm_amt == null || this.mm_amt  == 'undefined') {
        this._notify.showNotification('top', 'right', 'Please Fill Out All Field With *', 'danger');
        $(document.querySelector('#mm-amt')).removeClass('success').addClass('error');
        $(document.querySelector('#suc_mm_amt')).css('display', 'none');
        $(document.querySelector('#err_mm_amt')).css('display', 'block');
        return;
      }else {
        const testmm_amt = this.FormChecks('MMAmountChecks', this.mm_amt, '');
        if (!testmm_amt) {
          this._notify.showNotification('top', 'right', 'Error! Amount should only contain numbers.', 'danger');
          $(document.querySelector('#mm-amt')).removeClass('success').addClass('error');
          $(document.querySelector('#suc_mm_amt')).css('display', 'none');
          $(document.querySelector('#err_mm_amt')).css('display', 'block');
          return;
        } else {
          $(document.querySelector('#mm-amt')).removeClass('error').addClass('success');
          $(document.querySelector('#err_mm_amt')).css('display', 'none');
          $(document.querySelector('#suc_mm_amt')).css('display', 'block');
        }
      }
      this.ward_name = sessionStorage.getItem('studentName');
      this.ward_id = sessionStorage.getItem('studentid');
      this.ward_school_id = sessionStorage.getItem('schoolid');
      this.paying_amount = this.mm_amt;
      this.wallet = this.cellnumber;

      $(document.querySelector('#confirm-body-card-method')).css('display', 'none');
      $(document.querySelector('#confirm-body-mobile-money-method')).css('display', 'block');
    } else if (payment_method == '4') {
      sessionStorage.setItem('bankfrom', this.bankfrom);
      sessionStorage.setItem('acc_number_from', this.acc_number_from);
      sessionStorage.setItem('acc_number_to', this.bankto);
      sessionStorage.setItem('amount', this.bank_amt);
    }
    $(document.querySelector('#tab_2')).removeClass('active');
    $(document.querySelector('#tab2')).removeClass('active');
    $(document.querySelector('#tab_3')).css('display', 'block').addClass('active');
    $(document.querySelector('#tab3')).addClass('active');
    $(document.querySelector('#next')).css('display', 'none');
    $(document.querySelector('#finish')).css('display', 'block');
  }
  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
  FormChecks(x, y, z) {
    if (x == 'CardTypeNumberChecks') {
      if (y == 'visa card') {
        const card_numCheck = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
        return card_numCheck.test(z);
      } else if (y == 'master card') {
        const card_numCheck = new RegExp('^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$');
        return card_numCheck.test(z);
      }else {
        //
      }
    }else if (x == 'CardNameChecks') {
      if (y.split(' ').length > 1 ) {
        const card_numCheck = new RegExp("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$");
        return card_numCheck.test(y);
      }else {
        return false;
      }
    }else if (x == 'CardAmountChecks') {
      const card_amtCheck = /^\d+$/;
      return card_amtCheck.test(y);
    }else if (x == 'CardCVVchecks') {
      const card_amtCheck = /^\d+$/;
      return card_amtCheck.test(y);
    }else if (x == 'CardDateChecks') {
      const cardDateCheck = /^(1[0-2]|0[1-9]|\d)\/([2-9]\d[1-9]\d|[1-9]\d)$/;
      return cardDateCheck.test(y);
    }else if (x == 'MMAmountChecks') {
      const mm_amtCheck = /^\d+$/;
      return mm_amtCheck.test(y);
    }else if (x == 'MMCellNoChecks') {
      const mm_C_noCheck = /^\d+$/;
      return mm_C_noCheck.test(y);
    }else {
      //
    }
  }
  onFinish() {
    const payment_method = sessionStorage.getItem('payment_method');
    if (payment_method == '1') {} else if (payment_method == '2') {
    } else if (payment_method == '3') {
      const szterm = sessionStorage.getItem('currentTerm');
      const szacayear = sessionStorage.getItem('currentAcaYr');
      const szclass = sessionStorage.getItem('currentClass');
      const msisdn = this.cellnumber;
      const network = this.mmtype;
      const billitem = this.item_id;
      const billitemname = this.paying_item;
      const szamount = this.mm_amt;
      const studentname = sessionStorage.getItem('studentName');
      const payee = this.mm_name;
      const studentid = sessionStorage.getItem('studentid');
      const school  = sessionStorage.getItem('schoolid');

      this._genservice.mtnMOMO(szterm, szacayear, szclass, msisdn, network, billitem,
        billitemname, szamount, studentname, payee, studentid, school
      ).subscribe(response => {});
    } else if (payment_method == '4') {}

  }
}
























