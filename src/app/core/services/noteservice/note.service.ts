import { Injectable } from '@angular/core';
import { httpService } from '../httpservice/http.service';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  baseUrl = environment.baseUrl;
  public url;
  public access_token = localStorage.getItem('id');
  public httpOptions;
  public httpO;
  public httpImage;

  constructor(private service: httpService) { }

  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }
 
  // addNotes(RequestBody) {
  //   this.url = this.baseUrl + "/notes/addNotes";
  //   return this.service.PostUrlEncoded(this.url, this.getFormUrlEncoded(RequestBody))
  // }

  // noteUpdate(RequestBody) {

  //   this.url = this.baseUrl + "/notes/updateNotes";
  //   return this.service.PostUrlEncoded(this.url, this.getFormUrlEncoded(RequestBody))
  // }

  // postArchive(RequestBody) {
  //   this.url = this.baseUrl + "/notes/archiveNotes";
  //   return this.service.PostJson(this.url, RequestBody)
  // }

  // getArchive() {
  //   this.url = this.baseUrl + "/notes/getArchiveNotesList";
  //   return this.service.getUrlEncoded(this.url)
  // }

  // setColors(RequestBody) {
  //   this.url = this.baseUrl + "/notes/changesColorNotes";
  //   return this.service.PostJson(this.url, RequestBody)
  // }

  // addImage(RequestBody) {

  //   this.url = this.baseUrl + "/user/uploadProfileImage";
  //   return this.service.PostImage(this.url, RequestBody)
  // }

  // removeLabelFromNotes(RequestBody, noteId, labelId) {

  //   this.url = this.baseUrl + "/notes/" + noteId + "/addLabelToNotes/" + labelId + "/remove";
  //   return this.service.PostJson(this.url, RequestBody)
  // }

  // addChecklist(RequestBody, noteId) {

  //   this.url = this.baseUrl + "/notes/" + noteId + "/checklist/add";
  //   return this.service.PostJson(this.url, RequestBody)
  // }

  // updateChecklist(RequestBody, noteId, ChecklistId) {

  //   this.url = this.baseUrl + "/notes/" + noteId + "/checklist/" + ChecklistId + "/update";
  //   return this.service.PostJson(this.url, RequestBody)
  // }
  // removeChecklist(RequestBody, noteId, checklistId) {

  //   this.url = this.baseUrl + "/notes/" + noteId + "/checklist/" + checklistId + "/remove";
  //   return this.service.PostJson(this.url, RequestBody)
  // }
  // deleteReminder(RequestBody) {
  //   this.url = this.baseUrl + "/notes/removeReminderNotes";
  //   return this.service.PostJson(this.url, RequestBody)
  // }

  // addLabel(RequestBody) {

  //   this.url = this.baseUrl + "/noteLabels"
  //   return this.service.PostJson(this.url, RequestBody)

  // }
  // getLabelNotes(labelName) {

  //   this.url = this.baseUrl + "/notes/getNotesListByLabel/" + labelName;
  //   return this.service.PostJson(this.url, null)
  // }
  // getNoteLabellist() {

  //   this.url = this.baseUrl + "/noteLabels/getNoteLabelList"
  //   return this.service.getUrlEncoded(this.url)
  // }

  // editLabel(labelId, RequestBody) {

  //   this.url = this.baseUrl + "/noteLabels/" + labelId + "/updateNoteLabel";
  //   return this.service.PostJson(this.url, RequestBody)
  // }

  // deleteLabel(labelId) {
  //   this.url = this.baseUrl + "/noteLabels/" + labelId + "/deleteNoteLabel";
  //   return this.service.delete(this.url);
  // }

  // deleteNotes(url, RequestBody) {
  //   url = this.baseUrl + url + "/notes/trashNotes";
  //   return this.service.PostJson(this.url, RequestBody)
  // }

  // trash(RequestBody) {
  //   this.url = this.baseUrl + "/notes/trashNotes";
  //   return this.service.PostJson(this.url, RequestBody)
  // }




addNotes(RequestBody) {
    this.url = this.baseUrl + "/notes/addNotes";
    return this.service.PostUrlEncoded(this.url, this.getFormUrlEncoded(RequestBody))
  }
  getNotes() {

    this.url = this.baseUrl + "/notes/getNotesList";
    return this.service.getUrlEncoded(this.url)
  }
  noteUpdate(RequestBody) {

    this.url = this.baseUrl + "/notes/updateNotes";
    return this.service.PostUrlEncoded(this.url, this.getFormUrlEncoded(RequestBody))
  }
  updateChecklist(RequestBody, noteId, ChecklistId) {

    this.url = this.baseUrl + "/notes/" + noteId + "/checklist/" + ChecklistId + "/update";
    return this.service.PostJson(this.url, RequestBody)

  }
  removeChecklist(RequestBody, noteId, checklistId) {

    this.url = this.baseUrl + "/notes/" + noteId + "/checklist/" + checklistId + "/remove";
    return this.service.PostJson(this.url, RequestBody)

  }
  addChecklist(RequestBody, noteId) {

    this.url = this.baseUrl + "/notes/" + noteId + "/checklist/add";
    return this.service.PostJson(this.url, RequestBody)

  }
  archive(RequestBody) {

    this.url = this.baseUrl + "/notes/archiveNotes";
    return this.service.PostJson(this.url, RequestBody)

  }
  trash(RequestBody) {

    this.url = this.baseUrl + "/notes/trashNotes";
    return this.service.PostJson(this.url, RequestBody)

  }
  changeColor(RequestBody) {

    this.url = this.baseUrl + "/notes/changesColorNotes";
    return this.service.PostJson(this.url, RequestBody)

  }
  addImage(RequestBody) {

    this.url = this.baseUrl + "/user/uploadProfileImage";
    return this.service.PostImage(this.url, RequestBody)

  }
  addLabel(RequestBody) {

    this.url = this.baseUrl + "/noteLabels"
    return this.service.PostJson(this.url, RequestBody)

  }
  editLabel(labelId, RequestBody) {

    this.url = this.baseUrl + "/noteLabels/" + labelId + "/updateNoteLabel";
    return this.service.PostJson(this.url, RequestBody)

  }
  addLabeltoNotes(RequestBody, noteId, labelId) {

    this.url = this.baseUrl + "/notes/" + noteId + "/addLabelToNotes/" + labelId + "/add"
    return this.service.PostJson(this.url, RequestBody)

  }
  removeLabelFromNotes(RequestBody, noteId, labelId) {

    this.url = this.baseUrl + "/notes/" + noteId + "/addLabelToNotes/" + labelId + "/remove";
    return this.service.PostJson(this.url, RequestBody)

  }
  pin(RequestBody) {

    this.url = this.baseUrl + "/notes/pinUnpinNotes";
    return this.service.PostJson(this.url, RequestBody)

  }
  getNoteLabellist() {

    this.url = this.baseUrl + "/noteLabels/getNoteLabelList"
    return this.service.getUrlEncoded(this.url)
  }

  getLabelNotes(labelName) {

    this.url = this.baseUrl + "/notes/getNotesListByLabel/" + labelName;
    return this.service.PostJson(this.url, null)
  }
  addReminder(RequestBody) {

    this.url = this.baseUrl + "/notes/addUpdateReminderNotes";
    return this.service.PostJson(this.url, RequestBody)
  }
  deleteForever(RequestBody) {

    this.url = this.baseUrl + "/notes/deleteForeverNotes";
    return this.service.PostJson(this.url, RequestBody)
  }
  deleteReminder(RequestBody) {
    this.url = this.baseUrl + "/notes/removeReminderNotes";
    return this.service.PostJson(this.url, RequestBody)
  }
  getArchiveNotes() {
    this.url = this.baseUrl + "/notes/getArchiveNotesList";
    return this.service.getUrlEncoded(this.url)
  }
  getTrashNotes() {

    this.url = this.baseUrl + "/notes/getTrashNotesList";
    return this.service.getUrlEncoded(this.url)
  }
  getReminderNOteList(){
    
    this.url = this.baseUrl +"/notes/getReminderNotesList";
    return this.service.getJson(this.url);
  }
  
  deleteLabel(labelId) {
    this.url = this.baseUrl + "/noteLabels/" + labelId + "/deleteNoteLabel";
    return this.service.delete(this.url);
  }

}