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
import { AuthGuard } from '../app/core/services/authguard/auth.guard';
import { SearchComponent } from './components/search/search.component';
import { LabelNotesComponent } from './components/label-notes/label-notes.component';
import { QandAComponent } from './components/qand-a/qand-a.component';
import { ECommerceComponent } from './components/e-commerce/e-commerce.component';
import { EcommerceCartComponent } from './components/ecommerce-cart/ecommerce-cart.component';

const routes : Routes =[
  { path:'', redirectTo:'notes',pathMatch:'full'}, 
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'home', component:HomeComponent , canActivate:[AuthGuard], children  :[
    
              { path: 'notes', component: NotesComponent }, 
              { path: 'ecommerce-cart', component:EcommerceCartComponent},
              { path: 'remainders', component: RemaindersComponent },
              { path: 'labels', component: LabelsComponent},
              { path: 'labelNotes/:labelName', component: LabelNotesComponent},
              { path: 'archive', component: ArchiveComponent},
              { path: 'trash', component: TrashComponent},
              { path: 'search', component: SearchComponent},
             
              { path: 'qanda/:noteDetail', component: QandAComponent}
              
  ]},

  { path: 'resetpassword/:forgotToken', component: ResetPasswordComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full', },
  { path: 'ecommerce', component: ECommerceComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
