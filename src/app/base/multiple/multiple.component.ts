import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-multiple',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss']
})
export class MultipleComponent implements OnInit {


  data: any;
  optionsArr = [];
  finalOptions: any;
  boolSelection: any;
  multGroup: FormGroup;
  multControl: FormControl = new FormControl();
  finalValue: any;
  nextQuestionData: any;
  questionsData: any;
  correctMulAns: number = 0;
  wrongMultAns: number = 0;
  questionsTextAns: number = 0;
  totalQuest: number = 0;

  // grabbing the random data from the base component.
  @Input()
  set dataMultiple(value) {
    this.data = value;

    if( this.data && this.data.type === "multiple") {
      this.optionsArr = [];
      this.optionsArr.push.apply(this.optionsArr, [this.data.correct_answer, this.data.incorrect_answers]);
      this.finalOptions = Array.prototype.concat.apply([], this.optionsArr);
      console.log(this.finalOptions);
    }
  }

  // need to get this data in order to emit the new random data from this component to
  // base component so that base can able to send the data to its associated childs.

  @Input()
  set questionsDataMult(value){
    this.questionsData = value;
  }

  // emits the data to parent
  @Output() summaryCount : EventEmitter<any> = new EventEmitter();


  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.multGroup = this.fb.group({
      multControl: this.multControl
    });

      // converting the final value to string in case the api is returing string.
      // Used for comparision. Not needed but still used it.
      // counting the questions, correct and wrong answers here.
      // all the child components are coded same way and its good to move this logic to the service eventually.

    this.multGroup.get('multControl').valueChanges.subscribe( (value) => {
      this.finalValue = value;
      console.log(this.finalValue);
      if(this.finalValue === this.data.correct_answer) {
        this.correctMulAns += 1;
        this.questionsTextAns += 1;
      } else if(this.finalValue !== this.data.correct_answer) {
        this.wrongMultAns += 1;
        this.questionsTextAns += 1;
      } else if (this.finalValue !== null || this.finalValue !== '') {
        // this.questionsTextAns += 1;
      }
    });


  }

  // this method helps tp emit the data from this component to base component.
  // Logic needs to eventually move to service for reusability for other components.

  sendMulToBase(){
      this.nextQuestionData  =  this.questionsData.results[Math.floor(Math.random() * this.questionsData.results.length)];

      const summaryForBoolean = {
        totalQues: 1,
        correct: this.correctMulAns,
        wrong: this.wrongMultAns,
        questionsAns: this.questionsTextAns,
        nextQuestion: this.nextQuestionData
      };
      return this.summaryCount.emit(summaryForBoolean);
  }
}
