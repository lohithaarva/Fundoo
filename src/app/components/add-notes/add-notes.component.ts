import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { HttpService } from '../../core/services/httpservice/http.service';
import { CoreModule } from '@angular/flex-layout';
import { ColorComponent } from '../color/color.component';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {
  enterExpression = true;
  boxClicked =  true;
  checklist={};
 token=localStorage.getItem('token')
 changeColor = localStorage.getItem('color');
 color;
 inputArea=[];
 checkBoxArray=[];
 labelChipName=[];
 labelChipId=[];
 
 
  constructor(private myHttpService:HttpService) { }
  @Output() messageEvent = new EventEmitter();
  

  ngOnInit() {}
  finish(){
    if(!this.enterExpression){
      this.enterExpression=!this.enterExpression;
    }
    // else if(this.boxClicked){
      this.boxClicked = true;
    } 

    exit()
    { 
    
      console.log(this.color);
      this.myHttpService
      .addNotes('notes/addNotes', {
        'title'	:document.getElementById('titleId').innerHTML,
        'description':document.getElementById('notesId').innerHTML,
        'labelIdList': JSON.stringify(this.labelChipId),
        'checklist':'',
        'isPined':false,
        'color':this.color
          
      },this.token).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
          this.messageEvent.emit({
          })
          this.color="#fafafa";
        },
        error => {
          console.log("Error", error);
        })
        this.color="#fafafa";
    }

    ChangeColorNotes(event){
      console.log(event); 
      this.color= event;
    }

    // onKeydown(event) {
    //   if (event.key === "Enter" && event.key!= ""){
    //   console.log(event);
    //   this.checklist={
    //     "textVal" :"",
    //     "status":"open"
    //   }
    //   this.checkBoxArray.push(this.checklist);
      
    //   }
      
    

    addLabel(event){
      if(this.labelChipName.indexOf(event)<0){
        this.labelChipId.push(event.id);
        this.labelChipName.push(event);
        console.log(this.labelChipName);
        console.log(this.labelChipId);
      }
      else{
        this.labelChipId.splice(this.labelChipId.indexOf(event),1);
        this.labelChipName.splice(this.labelChipName.indexOf(event),1);

      }

    }

    public i=0;
    data;
    dataarray=[];
enter(){
  this.i++;
  if(this.data!=null){
    console.log(event,"keydown");
    var obj={
      "index":this.i,
      "data":this.data
    }
    this.dataarray.push(obj);
    this.data=null
    
  }
}
ondelete(deletedObj){
  console.log("ondelete function runnig");
  for(var i=0;i<this.dataarray.length;i++){
    if(deletedObj.index==this.dataarray[i].index){
      this.dataarray.splice(i,1);
      break;
    }
  }
  console.log(this.dataarray);
}

editing(event,edited){

  if(event.code=="Enter"){
    console.log("enter pressed");
    for(var i=0;i<this.dataarray.length;i++){
      if(edited.index==this.dataarray[i].index){
        this.dataarray[i].data==edited.data
      }
    }
    console.log(this.dataarray);
    
  }
}
  }


