import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  @ViewChild('reply') public replySucess: ElementRef;
  // @ViewChild ('typeQuestion') typeQuestion:ElementRef;
  private noteDetail;
  private titleId;
  private description;
  private checklist = [];
  private qandAData;
  private image;
  private img;
  private selfImg;
  private typeQuestion;
  private addQuestions = [];
  private newQuestion;
  public message;
  private likeCount;
  private countIncrease;
  private show = true;
  private replyToQuestion;
  private showPlaceHolder = true;
  private replied ;
  count: any;
  private replyDone = true;
  private replyOnce = [];
  private replyFirstLevel;
  private replySecondLevel;
  private secondReply = [];
  public thirdReply=[];
  constructor(public questionanswer: QuestionService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.image = localStorage.getItem('imageUrl');
    this.img = environment.apiUrl;
    this.selfImg = environment.apiUrl + this.image;
    console.log("particular label is been arrived");
    this.route.params.subscribe(
      (params: Params) => {
        this.noteDetail = params['noteDetail']
        this.getQuestionAnswer()
      })
  }

  backToNotes() {
    this.router.navigate(['home/notes']);
  }


  getQuestionAnswer() {
    this.questionanswer.askQuestionAnswer(this.noteDetail)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.qandAData = data['data']['data'][0];
          this.replyFirstLevel = data['data']['data'][0];
          console.log(this.qandAData)
          this.titleId = (this.qandAData.title);
          this.description = (this.qandAData.description);

          for (let i = 0; i < this.qandAData.noteCheckLists.length; i++) {
            if (this.qandAData.noteCheckLists[i].isDeleted == false) {
              this.checklist.push(this.qandAData.noteCheckLists[i])
            }
          }

          if (this.qandAData.questionAndAnswerNotes[0] != undefined) {
            this.addQuestions.push(this.qandAData.questionAndAnswerNotes[0]);
            this.likeCount = this.qandAData.questionAndAnswerNotes[0].like.length
            for (let i = 1; i < this.qandAData.questionAndAnswerNotes.length; i++) {
              if(this.qandAData.questionAndAnswerNotes[i].parentId===this.addQuestions[0].id){
              this.replyOnce.push(this.qandAData.questionAndAnswerNotes[i])
              }
            }
          }
          console.log("question and answer successfull", this.qandAData);
        })
  }




  addQuestionToNote(typeQuestion) {
    var RequestBody = {
      'message': typeQuestion,
      'notesId': this.noteDetail,
    }
    this.questionanswer.addQuestionToNote(RequestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.addQuestions = data['data']['details'].message
        LoggerService.log(data);

      })
  }

  like(ques) {
    let requestbody = {
      "like": true
    }
    this.questionanswer.addLikes(requestbody, ques.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.count = data['data']['details'].count;
      })
  }

  ratingAnswer(value, event) {

    var RequestBody = {
      'rate': event
    }
    this.questionanswer.rateStars(RequestBody, value.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        LoggerService.log('success rate', data);

      })
  }

  replyTo(quesObj) {
    // debugger;
    console.log(quesObj.id,'reply to here ');
    
    this.replyToQuestion = quesObj
    console.log(this.replyToQuestion,'assignment variable');
    
    this.replied = true;
  }


  sendReply() {
    let RequestBody = {
      "message": this.replySucess.nativeElement.innerHTML
    }
    this.questionanswer.replyTo(RequestBody, this.replyToQuestion.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        console.log(data);
        console.log(this.replyToQuestion,'lohitha');
        
      })
  }

  public rX=[]
    hasReply(ques)
  {
      this.rX=[];
      for (let i = 1; i < this.qandAData.questionAndAnswerNotes.length; i++) {
        if (ques.id === this.qandAData.questionAndAnswerNotes[i].parentId) {
          this.rX.push(this.qandAData.questionAndAnswerNotes[i])
          }
      }
      
     return true;
  }  
  public rZ;
  hasReplysecnd(ques){
  this.rZ=[];
    for (let i = 1; i < this.qandAData.questionAndAnswerNotes.length; i++) {
      if (ques.id === this.qandAData.questionAndAnswerNotes[i].parentId) {
        this.rZ.push(this.qandAData.questionAndAnswerNotes[i])
  
      }
    }
    return true;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}



















