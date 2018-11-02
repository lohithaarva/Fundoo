import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-label-notes',
  templateUrl: './label-notes.component.html',
  styleUrls: ['./label-notes.component.css']
})
export class LabelNotesComponent implements OnInit {

  constructor(private myHttpService: HttpService, public route: ActivatedRoute) { }
  labelName;
  labelArray=[];
 
  

  ngOnInit() {

    console.log("particular label is been arrived");
    this.route.params.subscribe(
    (params:Params)=>{
      this.labelName= params['labelName']
      this.getLabelNotes(this.labelName)
      console.log("i m here now");
      
    })
    }

    getLabelNotes(labelName){
      var url ="notes/getNotesListByLabel/"+labelName
      this.myHttpService.addNotes(url, null, localStorage.getItem('token')).subscribe(response => {
        console.log("successfull", response);
        this.labelArray=response['data'].data
        console.log(this.labelArray);
      }, error => {
        console.log("failed", error)
        })
    
    }
  }


    
   