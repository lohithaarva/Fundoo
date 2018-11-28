import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { QuestionService } from '../../core/services/questionans/question.service';


@Component({
  selector: 'app-qand-a',
  templateUrl: './qand-a.component.html',
  styleUrls: ['./qand-a.component.scss']
})
export class QandAComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  // @Input() noteDeleteCard;
  // @ViewChild ('typeQuestion') typeQuestion:ElementRef;
  private noteDetail;
  private titleId;
  private description;
  private qandAData;
  private image;
  private img;
  private typeQuestion;
  private addQuestion=[];
  private newQuestion;
  constructor(public questionanswer: QuestionService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.image = localStorage.getItem('imageUrl');
    this.img = environment.apiUrl + this.image;
    console.log("particular label is been arrived");
    this.route.params.subscribe(
      (params: Params) => {
        this.noteDetail = params['noteDetail']
        this.getQuestionAnswer()
      })
  }
  getQuestionAnswer() {
    this.questionanswer.askQuestionAnswer(this.noteDetail)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.qandAData = data['data']['data'][0];
          console.log(this.qandAData)
          this.titleId = (this.qandAData.title);
          this.description = (this.qandAData.description);
          this.addQuestion = this.qandAData.questionAndAnswerNotes;
          this.newQuestion = this.addQuestion
          console.log(this.addQuestion);
          
          console.log("question and answer successfull", data);
        })
  }
  addQuestionToNote(typeQuestion){ 
    var RequestBody = {
      'message': typeQuestion,
      'notesId': this.noteDetail,
    }
    this.questionanswer.addQuestionToNote(RequestBody)
    .pipe(takeUntil(this.destroy$))
    .subscribe(Response => {
      LoggerService.log(Response);
     
    })
  }
  

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
