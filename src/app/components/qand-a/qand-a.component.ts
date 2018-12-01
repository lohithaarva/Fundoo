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
  private xyz;
  private value;
  private avgRate;
  // private keyDownArray: boolean = false;
  // private keyDownArrayOnce:boolean = false;
  // private keyDownArrayTwice:boolean = false;
  private replies=[]
  private replyObj;
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
            this.xyz = this.qandAData.questionAndAnswerNotes;
            for (let i = 1; i < this.qandAData.questionAndAnswerNotes.length; i++) {
              if(this.qandAData.questionAndAnswerNotes[i].parentId===this.addQuestions[0].id){
              this.replyOnce.push(this.qandAData.questionAndAnswerNotes[i])
              }
            }
        for (let i = 1; i < this.qandAData.questionAndAnswerNotes.length; i++) {
          if (this.qandAData.questionAndAnswerNotes[0].id === this.qandAData.questionAndAnswerNotes[i].parentId) {
            this.replies.push(this.qandAData.questionAndAnswerNotes[i]);
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
    this.questionanswer.addLikes(requestbody, ques)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.count = data['data']['details'].count;
      })
      console.log(ques,'id of like is here');
      
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

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}



















// export class QandAComponent implements OnInit, OnDestroy {
//   @ViewChild('question') private questionAksed: ElementRef;
//   @ViewChild('reply') private replyDone: ElementRef;
//   destroy$: Subject<boolean> = new Subject<boolean>();
//   constructor(private route: ActivatedRoute,
//     private noteService: NoteService,
//     private qService: QuesAndAnsService,
//     private router: Router) { }
//   private noteId;
//   private title;
//   private description;
//   private checklist;
//   private questionStatus = false;
//   private question = [];
//   private questionValue;
//   private isReply = false;
//   URL = environment.URL;
//   noteDetails: Note[] = [];
//   private replies=[]
//   private rate;
//   private replyObj;
 
  
  
//   ngOnInit() {
//     this.route.params.subscribe(
//       (params: Params) => {
//         this.noteId = params['noteId']
//       })
//       this.getNoteDetails();    
//   }
//   getNoteDetails(){
//     this.noteService.getNOteDetails(this.noteId)
//       .pipe(takeUntil(this.destroy$))
//       .subscribe(response => {
//         this.noteDetails = response['data'].data
//         console.log(this.noteDetails);
//         this.title = this.noteDetails[0].title;
//         if (this.noteDetails[0].description != undefined) {
//           this.description = this.noteDetails[0].description;
//         }
//         if (this.noteDetails[0].noteCheckLists != undefined) {
//           this.checklist = this.noteDetails[0].noteCheckLists
//         }
//         if (this.noteDetails[0].questionAndAnswerNotes !== undefined) {
//           for (let i = 0; i < this.noteDetails[0].questionAndAnswerNotes.length;i++){
//             this.question.push(this.noteDetails[0].questionAndAnswerNotes[i])
//           }
//         }
//         if (this.question.length !== 0) {
//           this.questionStatus = true;
//         }
        
//         for (let i = 1; i < this.question.length; i++) {
//           if (this.question[0].id === this.question[i].parentId) {
//             this.replies.push(this.question[i]);
//           }
//         }
//     })

//   }
//   private imag
//   private imagpath
//   private rateDisp;
//   private userRating
//   imageFormation(ques){
  
//     this.imag = ques.user.imageUrl;
//     this.imagpath = this.URL + this.imag;
//     return true;
//   }
//   private liked = false;
//   isliked(ques) {
//     this.liked = false;
//     for (let i = 0; i < ques['like'].length; i++) {
//       if (ques.like[i].userId == localStorage.getItem('userId') && ques.like[i].like == true) {
//         this.liked = true;
//         return true;
//       }
//     }
//     return true;

//   }

//   private lykC;
//   likeDisplay(ques){
//     this.lykC=0;
//     for (let i = 0; i < ques.like.length;i++){
//       if(ques.like[i].like==true){
//         this.lykC=this.lykC+1;
//       }
//     }
//     return true;
//   }
//   lengthCheck(){
//     if(this.question.length>1){
//       return true;
//     }
//     return false;
//   }
//   private rX=[]
//   hasReply(ques)
// {
//     this.rX=[]
//     for (let i = 1; i < this.question.length; i++) {
//       if (ques.id === this.question[i].parentId) {
//         this.rX.push(this.question[i])
//         }
//     }
//    return true;
// }  
// private rZ;
// hasReplysecnd(ques){
// this.rZ=[];
//   for (let i = 1; i < this.question.length; i++) {
//     if (ques.id === this.question[i].parentId) {
//       this.rZ.push(this.question[i])

//     }
//   }
//   return true;
// }
// addQuestion(e) {
//       if (e.keyCode === 13) {
//       this.questionValue = this.questionAksed.nativeElement.innerHTML;
//       this.addQuestionToNote();
//       this.questionAksed.nativeElement.innerHTML = '';
//     }
// }
//   addQuestionToNote() {
//     let RequestBody = {
//       "message": this.questionValue,
//       "notesId": this.noteId
//     }
//     this.qService.addAquestion(RequestBody)
//       .pipe(takeUntil(this.destroy$))
//       .subscribe(response => {
//         this.questionStatus = false;
//         this.getNoteDetails();
//       })
//   }
//   closeQandA() {
//     this.router.navigate(['home'])
//   }
  
//   reply(replyOBJ) {
//     this.replyObj=replyOBJ;
//     console.log(this.replyObj);
//     this.isReply = true;
//   }
//   sendReply() {
//     console.log(this.replyDone.nativeElement.innerHTML);
//     let RequestBody={
//       "message": this.replyDone.nativeElement.innerHTML
//     }
//     this.qService.addReply(RequestBody,this.replyObj.id)
//       .pipe(takeUntil(this.destroy$))
//       .subscribe(response=>{})
//   }
//   like(ques,flag){
//     let requestbody={
//       "like": flag
//     }
//     this.qService.addLike(requestbody, ques.id)
//       .pipe(takeUntil(this.destroy$))
//       .subscribe(response => {
//         this.liked=flag;
//       })
//   }
//   rating1(rate,ques){
//     console.log(rate);
//     let request={
//       "rate":rate
//     }
//     this.qService.addRating(request, ques.id)
//       .pipe(takeUntil(this.destroy$))
//       .subscribe(response=>{})
//   }
//   ratingDisp(ques) {
//     this.rateDisp=0;
//     this.userRating =0;
//     let cal = ques.rate.length;
//     let count = 0;
//     if (cal !== 0) {
//       for (let i = 0; i < cal; i++) {
//         count = count + ques.rate[i].rate
//         if (ques.rate[i].userId === localStorage.getItem('userId')) {
//           this.userRating = ques.rate[i].rate;
//         }
//       }

//       this.rateDisp = count / cal
//       console.log(this.rateDisp);

//     }
//     return true;
//   }
//   ngOnDestroy() {
//     this.destroy$.next(true);
//     this.destroy$.unsubscribe();
//   }

// }