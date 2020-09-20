import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {


  data: any;
  optionsArr = [];
  finalOptions: any;
  boolSelection: any;
  textGroup: FormGroup;
  textControl: FormControl = new FormControl();
  finalValue: any;
  noTextAnswer:number = 0;
  wrongAnswer: number = 0;
  nextQuestionData: any;
  questionsData: any;
  correctTextAns: number = 0;
  wrongTextAns: number = 0;
  questionsTextAns: number = 0;

  @Input()
  set dataText(value) {
    this.data = value;

    if( this.data && this.data.type === "text") {
      this.optionsArr = [];
      this.optionsArr.push.apply(this.optionsArr, [this.data.correct_answer]);
      this.finalOptions = Array.prototype.concat.apply([], this.optionsArr);
      console.log(this.finalOptions);
    }
  }

  @Input()
  set questionsDataText(value){
    this.questionsData = value;
  }

  @Output() summaryCount: EventEmitter<any> = new EventEmitter();


  constructor(private fb: FormBuilder) {
    console.log("CONSTRUCTUR: boolean component called")
   }

  ngOnInit() {
    this.textGroup = this.fb.group({
      textControl: this.textControl
    });


    this.finalValue = this.textGroup.get('textControl').value;
    if(this.finalOptions ) {
      if(this.finalValue.toString() === this.data.correct_answer) {
        this.correctTextAns += 1;
        this.questionsTextAns += 1;
      }

    if(this.finalValue.toString() !== this.data.correct_answer) {
        this.wrongTextAns += 1;
        this.questionsTextAns += 1;
      }
    }

      console.log(this.finalValue);
      console.log("noanswer:", this.wrongTextAns);
  }

  sendTextToBase(){
      this.nextQuestionData  =  this.questionsData.results[Math.floor(Math.random() * this.questionsData.results.length)];

      const summaryForBoolean = {
        totalQues: 1,
        correct: this.correctTextAns,
        wrong: this.wrongTextAns,
        questionsAns: this.questionsTextAns,
        nextQuestion: this.nextQuestionData
      };

      return this.summaryCount.emit(summaryForBoolean);

  }

}
