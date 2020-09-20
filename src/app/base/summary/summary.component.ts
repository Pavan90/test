import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  restartVal: number = 0;
  finalCorrect: number;
  finalWrong: number;
  finalQues: number;
  finalScore: any;

  @Input()
  set finalSum(value) {
    this.finalCorrect = value.correct;
    this.finalWrong = value.wrong;
    this.finalQues = value.ques;
    this.finalScore = `${((this.finalCorrect / this.finalQues) * 100) || 0 }%`;
  }

  @Output() restartCount: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  sendRestartNotice(){
    return this.restartCount.emit(this.restartVal);
  }

}
