import { DatePipe, DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-date-selected',
  templateUrl: './date-selected.component.html',
  styleUrls: ['./date-selected.component.scss'],
})
export class DateSelectedComponent implements OnInit {
  tStartdate: Date;
  tEnddate: Date;
  minDate: Date;
  maxDate: any;
  value: any;
  startDateSelected: Date;
  endDateSelected: Date;
  @Output() onStartDateSelected = new EventEmitter();
  @Output() onEndDateSelected = new EventEmitter();
  @Input() set selectedDate(value){
    this.setDateStart(value);
    if(value){
      this.setDateEnd(new Date());
    }
  };

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    var dateTime = new Date();
    this.tStartdate = dateTime;
    this.startDateSelected = dateTime;
    this.endDateSelected = dateTime;
    this.tEnddate = dateTime;
    this.maxDate = this.datePipe.transform(dateTime, 'yyyy-MM-ddThh:mm');
  }

  setDateStart(date) {
    this.startDateSelected = date;
    this.tStartdate = date;
    this.minDate = date;
    this.onStartDateSelected.emit(moment(date).toDate());
  }

  setDateEnd(date) {
    this.endDateSelected = date;
    this.onEndDateSelected.emit(moment(date).toDate());
  }
}
