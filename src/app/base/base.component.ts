import { Component, OnInit } from '@angular/core';
import { BaseService } from './base.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  questionsData: any;
  randomDataFive: any;
  firstFive: any = [];

  booleanCountObj: any;
  multiCountObj: any;
  total:number = 0;
  textCountObj: any;
  fiveCount: number = 5;

  summaryMultiCorrect:number = 0;
  summaryMultiWrong:number = 0;
  summaryMultiQues: number = 0;

  summaryBoolCorrect:number = 0;
  summaryBoolWrong:number = 0;
  summaryBoolQues: number = 0;

  summaryTextCorrect:number = 0;
  summaryTextWrong: number = 0;
  summaryTextQues: number = 0;

  correct: number = 0;
  score: any;

  constructor(private baseService: BaseService) { }

  ngOnInit() {
    this.baseService.getData().subscribe( (data) => {
      this.questionsData = data;
      console.log(this.questionsData);
      this.randomDataFive = this.questionsData.results[Math.floor(Math.random() * this.questionsData.results.length)];
      this.firstFive.push(this.randomDataFive);
      console.log("randomDataFive", this.randomDataFive);
      console.log("firstFive", this.firstFive);
      console.log("this.total number =======>>>>", this.total);
    });
  }

  getNextObject(e:any){
    this.randomDataFive = this.questionsData.results[Math.floor(Math.random() * this.questionsData.results.length)];
    this.firstFive.push(this.randomDataFive);
    console.log(this.firstFive)
    return this.firstFive;
  }

  getCountFromBoolean(data:any){

    this.booleanCountObj = data;
    console.log("THIS.booleanCountObj", this.booleanCountObj);
    this.randomDataFive = this.booleanCountObj.nextQuestion;
    this.total += this.booleanCountObj.totalQues;
    this.summaryBoolCorrect = this.booleanCountObj.correct;
    this.summaryBoolWrong = this.booleanCountObj.wrong;
    this.summaryBoolQues = this.booleanCountObj.questionsAns;
    console.log("summary BOOL count", this.summaryBoolCorrect , "summaryBool wrong", this.summaryBoolWrong, "summaryBoolQues", this.summaryBoolQues);

    this.getTotal();
    this.getFinalScore();

  }
  getCountFromMult(data:any){
    this.multiCountObj = data;
    console.log("this.multiCountObj", this.multiCountObj);
    this.randomDataFive = this.multiCountObj.nextQuestion;
    this.total += this.multiCountObj.totalQues;
    this.summaryMultiCorrect = this.multiCountObj.correct;
    this.summaryMultiWrong = this.multiCountObj.wrong;
    this.summaryMultiQues = this.multiCountObj.questionsAns;
    console.log("summary multi count", this.summaryMultiCorrect , "summarymulti wrong", this.summaryMultiWrong, "summaryMultiQues", this.summaryMultiQues);
    this.getTotal();
    this.getFinalScore();
  }

  getCountFromText(data: any){
    this.textCountObj = data;
    console.log("this.textCountObj", this.textCountObj);
    this.randomDataFive = this.textCountObj.nextQuestion;
    this.total += this.textCountObj.totalQues;
    this.summaryTextCorrect = this.textCountObj.correct;
    this.summaryTextWrong = this.textCountObj.wrong;
    this.summaryTextQues = this.textCountObj.questionsAns;

    console.log("summary text count", this.summaryTextCorrect , "summary text wrong", this.summaryTextWrong, "summary text Ques", this.summaryTextQues);

    this.getTotal();
    this.getFinalScore();

  }

  getTotal(){
    console.log(this.total);
    return this.total;
  }

  getFinalScore(){
    this.score = {
      correct : this.summaryBoolCorrect + this.summaryMultiCorrect + this.summaryTextCorrect,
      wrong: this.summaryBoolWrong + this.summaryMultiWrong + this.summaryTextWrong,
      ques: this.summaryBoolQues + this.summaryMultiQues + this.summaryTextQues
    };
    return this.score;
  }

  getRestartNotice(data: number){
    this.total = data;
    this.summaryBoolCorrect = data;
    this.summaryMultiCorrect = data;
    this.summaryTextCorrect = data;

    this.summaryBoolWrong = data;
    this.summaryMultiWrong = data;
    this.summaryTextWrong = data;

    this.summaryBoolQues = data;
    this.summaryMultiQues = data;
    this.summaryTextQues = data;

  }


}
