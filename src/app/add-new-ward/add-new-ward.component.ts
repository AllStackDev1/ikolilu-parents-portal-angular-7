import { Component, OnInit } from '@angular/core';
import { SchoolList } from '../schools';
import { GeneralService } from '../general.service';
import { NotifyService } from '../notify.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-ward',
  templateUrl: './add-new-ward.component.html',
  styleUrls: ['./add-new-ward.component.css']
})
export class AddNewWardComponent implements OnInit {
  public visible = false;
  public visibleAnimate = false;
  schoolList: SchoolList[];
  setTime: any;
  addWardForm: FormGroup;
  wardsFound = [];
  tempArr: any = [];
  parentEmail = sessionStorage.getItem('email');
  phonenumber = sessionStorage.getItem('phonenumber');
  wardcount = 0;

  constructor(
    private _genservice: GeneralService,
    private _notify: NotifyService,
    private fb: FormBuilder
  ) {
    this.addWardForm = this.fb.group({
      ward: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getSchoolList();
    this.findMyWards();
  }

  public show(): void {
    this.visible = true;
    setTimeout(() => (this.visibleAnimate = true), 100);
    $('body').addClass('hideScrollBar');
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => (this.visible = false), 300);
    $('body').removeClass('hideScrollBar');
  }

  SetTime() {
    this.setTime = setTimeout(function() {
      alert('Slow Network Connection...');
    }, 5000);
  }

  StopTime() {
    clearTimeout(this.setTime);
  }

  getSchoolList(): void {
    this._genservice.listSchools().subscribe(response => {
      this.schoolList = response;
    });
  }

  findMyWards(): void {
    this._genservice.findMyWards().subscribe(response => {
      if (response.length !== 0) {
        for (let v = 0; v < response.length; v++) {
          if (
            response[v].photo_file === '' ||
            response[v].photo_file === null ||
            response[v].photo_file === undefined
          ) {
            response[v].photo_file = 'assets/img/avatar.jpg';
          } else {
            response[v].photo_file =
              'https://www.ikolilu.com/academics/studentimgs/' +
              response[v].sz_schoolid +
              '/' +
              encodeURI(response[v].photo_file);
          }
        }
        this.wardsFound = response;
        this.wardcount = response.length;
      }
    });
  }

  onSelect(event) {
    const value = JSON.parse(event.target.value);
    if (!event.target.checked) {
      for (let i = 0; i <= this.tempArr.length; i++) {
        if (this.tempArr[i]['studentid'] === value['studentid']) {
          this.tempArr.splice(i, 1);
        }
      }
    } else {
      this.tempArr.push(value);
    }

    if (this.tempArr.length === 0) {
      this.addWardForm = this.fb.group({
        ward: ['', Validators.required]
      });
    }
  }

  OnSubmit() {
    this.SetTime();
    this.hide();
    $(function() {
      $('.fade').fadeIn('slow');
      $('.preload').fadeIn('slow');
    });
    this._genservice.addWardsToFile(this.tempArr).subscribe(
      response => {
        this.hide();
        if (response.success == true) {
          this.StopTime();
          $(function() {
            $('.fade').fadeOut('slow');
            $('.preload').fadeOut('slow');
          });
          this._notify.showNotification(
            'top',
            'left',
            response.errors.reason,
            'success'
          );
        } else {
          $(function() {
            this.StopTime();
            $('.fade').fadeOut('slow');
            $('.preload').fadeOut('slow');
          });
          this._notify.showNotification(
            'top',
            'left',
            'Error While Adding Ward. Please Try Again',
            'danger'
          );
        }
      },
      error => {
        this.hide();
        if (error.status === 0) {
          $(function() {
            this.StopTime();
            $('.fade').fadeOut('slow');
            $('.preload').fadeOut('slow');
          });
          this._notify.showNotification(
            'top',
            'left',
            'Please Check Your Network Connection',
            'danger'
          );
          return;
        }
      }
    );
  }
}
