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
  @ViewChild('reply') public replySucess: ElementRef;
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
  private replied;
  count: any;
  private replyDone = true;
  private replyOnce = [];
  private replyFirstLevel;
  private replySecondLevel;
  private secondReply = [];
  public thirdReply = [];
  private answerQuestion;
  private value;
  private avgRate;
  private replies = []
  private replyObj;
  public rX = []
  private reply_count;
  public rZ;
  private editorContent;

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
          this.replyOnce = [];
          this.qandAData = data['data']['data'][0];
          this.replyFirstLevel = data['data']['data'][0];
          console.log(this.qandAData);
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
            this.answerQuestion = this.qandAData.questionAndAnswerNotes;
            for (let i = 1; i < this.qandAData.questionAndAnswerNotes.length; i++) {
              if (this.qandAData.questionAndAnswerNotes[i].parentId === this.addQuestions[0].id
                && this.qandAData.questionAndAnswerNotes[i].isApproved == true) {
                this.replyOnce.push(this.qandAData.questionAndAnswerNotes[i])
              }
            }
            for (let i = 1; i < this.qandAData.questionAndAnswerNotes.length; i++) {
              if (this.qandAData.questionAndAnswerNotes[0].id === this.qandAData.questionAndAnswerNotes[i].parentId
              ) {
                this.replies.push(this.qandAData.questionAndAnswerNotes[i]);
              }
            }
          }
        })
  }

  addQuestionToNote() {
    var RequestBody = {
      'message': this.editorContent,
      'notesId': this.noteDetail,
    }
    this.questionanswer.addQuestionToNote(RequestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.addQuestions = data['data']['details'].message
        this.getQuestionAnswer()
      })
  }

  like(ques) {
    let requestbody = {
      "like": true
    }
    this.questionanswer.addLikes(requestbody, ques)
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
    this.replyToQuestion = quesObj
    this.replied = true;
  }


  sendReply() {
    let RequestBody = {
      "message": this.editorContent
    }
    this.questionanswer.replyTo(RequestBody, this.replyToQuestion.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.replied = false;
        this.getQuestionAnswer();
      })

  }


  hasReply(ques) {
    this.rX = [];
    this.reply_count = 0;
    for (let i = 1; i < this.qandAData.questionAndAnswerNotes.length; i++) {
      if (ques.id === this.qandAData.questionAndAnswerNotes[i].parentId) {
        this.rX.push(this.qandAData.questionAndAnswerNotes[i]);
      }
    }
    this.reply_count = this.rX.length;
    return true;

  }
  hasReplysecnd(ques) {
    this.rZ = [];
    this.reply_count = 0;
    for (let i = 1; i < this.qandAData.questionAndAnswerNotes.length; i++) {
      if (ques.id === this.qandAData.questionAndAnswerNotes[i].parentId) {
        this.rZ.push(this.qandAData.questionAndAnswerNotes[i])
      }
    }
    this.reply_count = this.rZ.length;
    return true;
  }

  averageRating(rateArray) {
    this.value = 0;
    if (rateArray.length != 0) {
      for (let i = 0; i < rateArray.length; i++) {
        this.value += rateArray[i].rate
      }
      this.avgRate = this.value / rateArray.length;
      return this.avgRate;
    }
  }

  public Editor: Object = {
    charCounterCount: false,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert', 'strikeThrough', 'subscript',
      'superscript', 'fontFamily', 'fontSize', 'formatBlock', 'blockStyle', 'align', 'insertOrderedList',
      'insertUnorderedList', 'outdent', 'indent', 'selectAll', 'undo', 'redo', 'fullscreen', 'orderedList'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert', 'fontSize',
      'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'formatBlock', 'blockStyle',
      'align', 'insertOrderedList', 'insertUnorderedList', 'outdent', 'indent', 'selectAll', 'undo', 'redo',
      'fullscreen', 'orderedList'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert', 'fontSize',
      'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'formatBlock', 'blockStyle',
      'align', 'insertOrderedList', 'insertUnorderedList', 'outdent', 'indent', 'selectAll', 'undo', 'redo',
      'fullscreen', 'orderedList'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert', 'fontSize',
      'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'formatBlock', 'blockStyle',
      'align', 'insertOrderedList', 'insertUnorderedList', 'outdent', 'indent', 'selectAll', 'undo', 'redo',
      'fullscreen', 'orderedList'],
  };

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}