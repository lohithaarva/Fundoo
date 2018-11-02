import { NgModule } from '@angular/core';
import { RouterModule, Routes, OutletContext } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HomeComponent } from './components/home/home.component';
import { NotesComponent } from './components/notes/notes.component';
import { RemaindersComponent } from './components/remainders/remainders.component';
import { LabelsComponent } from './components/labels/labels.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthGuard } from './auth.guard';
import { SearchComponent } from './components/search/search.component';
import { LabelNotesComponent } from './components/label-notes/label-notes.component';

const routes : Routes =[
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'home', component:HomeComponent , canActivate: [AuthGuard], children  :[

              { path: 'notes', component: NotesComponent }, 
              { path: 'remainders', component: RemaindersComponent },
              { path: 'labels', component: LabelsComponent},
              { path: 'labelNotes/:labelName', component: LabelNotesComponent},
              { path: 'archive', component: ArchiveComponent},
              { path: 'trash', component: TrashComponent},
              { path: 'search', component: SearchComponent},
              { path: 'settings', component:SettingsComponent},
              { path:'', redirectTo:'notes',pathMatch:'full'},
  ]},

  { path: 'resetpassword/:forgotToken', component: ResetPasswordComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
