import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { SlidePanelComponent } from './components/slide-panel/slide-panel.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatSidenavModule, MatListModule } from '@angular/material';
import { NotesComponent } from './components/notes/notes.component';
import { RemaindersComponent } from './components/remainders/remainders.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LabelsComponent } from './components/labels/labels.component';
import { MatMenuModule } from '@angular/material/menu';
import { IconsListComponent } from './components/icons-list/icons-list.component';
import { RemindComponent } from './components/remind/remind.component';
import { CollaboratorComponent } from './components/collaborator/collaborator.component';
import { ColorComponent } from './components/color/color.component';
import { AddImageComponent } from './components/add-image/add-image.component';
import { AddArchiveComponent } from './components/add-archive/add-archive.component';
import { MoreComponent } from './components/more/more.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { AddNotesComponent } from './components/add-notes/add-notes.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponentComponent } from './components/dialog-component/dialog-component.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { LabelfilterPipe } from './pipes/labelfilter.pipe';
import { SearchComponent } from './components/search/search.component';
import { LabelNotesComponent } from './components/label-notes/label-notes.component';
// import { SearchPipe } from './_pipe/search/search.pipe';

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
    LabelNotesComponent
    
    
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
    MatChipsModule
  
  ],
  

  providers: [HttpService, AuthGuard , AuthService],
  entryComponents :[DialogComponentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
