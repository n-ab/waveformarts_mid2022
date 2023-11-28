import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AdminComponent } from './components/admin/admin.component';
import { BookComponent } from './components/book/book.component';
import { ContactComponent } from './components/contact/contact.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { StartProjectComponent } from './components/start-project/start-project.component';
import { StoreComponent } from './components/store/store.component';
import { UploadComponent } from './components/upload/upload.component';
import { UserEmailresetComponent } from './components/user-emailreset/user-emailreset.component';
import { UserFilesComponent } from './components/user-files/user-files.component';
import { UserPasswordresetComponent } from './components/user-passwordreset/user-passwordreset.component';
import { ProjectManageComponent } from './components/project-manage/project-manage.component';
import { ContactPostComponent } from './components/contact-post/contact-post.component';

const routes: Routes = [
  { path: '',                       component: LandingComponent},
  { path: 'upload',                 component: UploadComponent},
  { path: 'account',                component: AccountComponent},
  { path: 'admin',                  component: AdminComponent},
  { path: 'contact',                component: ContactComponent},
  { path: 'post-contact',           component: ContactPostComponent},
  { path: 'book',                   component: BookComponent},
  { path: 'rentals',                component: RentalsComponent},
  { path: 'login',                  component: LoginComponent},
  { path: 'register',               component: RegisterComponent},
  // U S E R     A C C O U N T     R O U T E S
  { path: 'store',                  component: StoreComponent },
  { path: 'project',                component: ProjectManageComponent},
  { path: 'account/files',          component: UserFilesComponent },
  { path: 'account/passwordreset',  component: UserPasswordresetComponent },
  { path: 'account/emailreset',     component: UserEmailresetComponent },
  { path: 'start/project',          component: StartProjectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
