import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { LabelNotesComponent } from './components/label-notes/label-notes.component';
import { TrashDialogComponent } from './components/trash-dialog/trash-dialog.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { AddNotesComponent } from './components/add-notes/add-notes.component';
import { NotesComponent } from './components/notes/notes.component';
import { RemaindersComponent } from './components/remainders/remainders.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LabelsComponent } from './components/labels/labels.component';
import { IconsListComponent } from './components/icons-list/icons-list.component';
import { RemindComponent } from './components/remind/remind.component';
import { CollaboratorComponent } from './components/collaborator/collaborator.component';
import { ColorComponent } from './components/color/color.component';
import { AddImageComponent } from './components/add-image/add-image.component';
import { AddArchiveComponent } from './components/add-archive/add-archive.component';
import { SlidePanelComponent } from './components/slide-panel/slide-panel.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DialogComponentComponent } from './components/dialog-component/dialog-component.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MoreComponent } from './components/more/more.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { LoggerService } from '../app/core/services/logger/logger.service'
import { HttpService } from './core/services/httpservice/http.service';
import { AuthService } from '../app/core/services/authguard/auth.service';
import { AuthGuard } from '../app/core/services/authguard/auth.guard';
import { LabelfilterPipe } from '../app/core/pipes/labelfilter.pipe';
import { MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule,
         MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule,
         MatMenuModule, MatChipsModule, MatGridListModule, MatCheckboxModule,
         MatDialogModule, MatSnackBarModule, MatDatepickerModule,
         MatNativeDateModule, MatSelectModule, MatTooltipModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { CropImageComponent } from './components/crop-image/crop-image.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LabelTrashDialogComponent } from './components/label-trash-dialog/label-trash-dialog.component';
import { PinComponent } from './components/pin/pin.component';
import { MessageServiceService } from './core/services/message-service/message-service.service';


  
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    SlidePanelComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    HomeComponent,
    NavbarComponent,
    NotesComponent,
    RemaindersComponent,
    ArchiveComponent,
    TrashComponent,
    SettingsComponent,
    LabelsComponent,
    IconsListComponent,
    RemindComponent,
    CollaboratorComponent,
    ColorComponent,
    AddImageComponent,
    AddArchiveComponent,
    MoreComponent,
    AddNotesComponent,
    NoteCardComponent,
    DialogComponentComponent,
    LabelfilterPipe,
    SearchComponent,
    LabelNotesComponent,
    TrashDialogComponent,
    CropImageComponent,
    LabelTrashDialogComponent,
    PinComponent
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatCheckboxModule,
    MatChipsModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ImageCropperModule,
    MatSelectModule,
    MatTooltipModule
  
  ],
  

  providers: [HttpService, AuthGuard , AuthService, LoggerService, MessageServiceService],
  entryComponents :[DialogComponentComponent , TrashDialogComponent, CropImageComponent,
                    LabelTrashDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
