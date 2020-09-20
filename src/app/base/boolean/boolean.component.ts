import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-boolean',
  templateUrl: './boolean.component.html',
  styleUrls: ['./boolean.component.scss']
})
export class BooleanComponent implements OnInit {

  data: any;
  questionsData: any;
  nextQuestionData: any;
  optionsArr = [];
  finalOptions: any;
  boolSelection: any;
  boolGroup: FormGroup;
  boolControl: FormControl = new FormControl();
  finalValue: any;
  correctBoolAns:number = 0;
  wrongBoolAns:number = 0;
  questionsTextAns: number = 0;
  totalQuest: number = 0;

  // grabbing the random data from the base component.
  @Input()
  set dataBool(value) {
    this.data = value;
    console.log("data before clicking bool next", this.data)

    // checks the type of the data and proceeeds if the type matches
    if( this.data && this.data.type === "boolean") {
      this.optionsArr = [];

      // this array stores the all type of options for the question.
      // this is just to loop the required options.
      this.optionsArr.push.apply(this.optionsArr, [this.data.correct_answer, this.data.incorrect_answers]);

      // need to concat the array.
      this.finalOptions = Array.prototype.concat.apply([], this.optionsArr);
      console.log(this.finalOptions);
    }
  }

  // need to get this data in order to emit the new random data from this component to
  // base component so that base can able to send the data to its associated childs.

  @Input()
  set questionsDataBool(value){
    this.questionsData = value;
  }
  // emits the data to parent
  @Output() summaryCount : EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // used form builder. Could have used just form control as it is just one single field.
    this.boolGroup = this.fb.group({
      boolControl: this.boolControl
    });

    // checks the newvalue. We can also grab old value from here if needed.
    this.boolGroup.get('boolControl').valueChanges.subscribe( (value) => {
      this.finalValue = value;

      // converting the final value to string in case the api is returing string.
      // Used for comparision. Not needed but still used it.
      // counting the questions, correct and wrong answers here.
      if(this.finalValue.toString() === this.data.correct_answer) {
        this.correctBoolAns += 1;
        this.questionsTextAns += 1;

      } else if(this.finalValue.toString() !== this.data.correct_answer) {
        this.wrongBoolAns += 1;
        this.questionsTextAns += 1;

      } else if (this.finalValue.toString() !== null || this.finalValue !== undefined) {
        // this.questionsTextAns += 1;
      }
    });

  }
  // this method helps tp emit the data from this component to base component.
  // Logic needs to eventually move to service for reusability for other components.
  sendToBase(){

      this.nextQuestionData  =  this.questionsData.results[Math.floor(Math.random() * this.questionsData.results.length)];

      const summaryForBoolean = {
        totalQues: 1,
        correct: this.correctBoolAns,
        wrong: this.wrongBoolAns,
        questionsAns: this.questionsTextAns,
        nextQuestion: this.nextQuestionData
      };

      return this.summaryCount.emit(summaryForBoolean);
  }

}
