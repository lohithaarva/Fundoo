/************************************************************************************************
*  Execution       :   1. default node         cmd> archive.ts 
*        
*  Purpose         :  To display notecards which are archived and also perform functionality
                      when clicked.
* 
*  Description    
* 
*  @file           : archive.ts
*  @overview       : To display notecards which are archived and also perform functionality
                     when clicked
*  @module         : archive.ts - This is optional if expeclictly its an npm or local package
*  @author         : LohithaShree <lohitha.arva@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '../../../environments/environment';
import { NavbarComponent } from '../navbar/navbar.component';
import { DataService } from '../../core/services/dataservice/data.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { NoteService } from 'src/app/core/services/noteservice/note.service';
/**A componenet can be reused throughout the application & even in other applications */
@Component({
    selector: 'app-crop-image',/**A string value which represents the component on browser at 
    execution time */
    templateUrl: './crop-image.component.html',/**External templating process to define html
    tags in component */
    styleUrls: ['./crop-image.component.scss']/**It is used to provide style of components */
})
/**To use components in other modules , we have to export them */
export class CropImageComponent implements OnInit {
    public croppedImage: any = '';
    imageChangedEvent: any = '';
    constructor(
        public dialogRefPic: MatDialogRef<NavbarComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private noteService: NoteService,
        private dataService: DataService) { }
    /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
    ngOnInit() { }

    /** Method to crop the selected profile picture*/
    imageCropped(event: any) {
        this.croppedImage = event.file;
    }
    public image2 = localStorage.getItem('imageUrl');
    img = environment.apiUrl + this.image2;

    /**Mthod to upload profile picture */
    onUpload() {
        var token = localStorage.getItem('token');
        LoggerService.log(this.croppedImage);
        const uploadData = new FormData();
        uploadData.append('file', this.croppedImage);
        this.noteService.addImage(uploadData).subscribe
            (res => {
                this.img = environment.apiUrl + res['status'].imageUrl;
                localStorage.setItem("imageUrl", res['status'].imageUrl);
                this.dialogRefPic.close()
                this.dataService.changeMsg(true);
            })
    }
}

