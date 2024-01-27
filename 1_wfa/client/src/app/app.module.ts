import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { UploadComponent } from './components/upload/upload.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './components/account/account.component';
import { ProjectAddComponent } from './components/project-add/project-add.component';
import { ProjectManageComponent } from './components/project-manage/project-manage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrettyJsonPipe } from './pipes/prettifyJsonPipe';
// --- material -------------
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule} from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
// --- -----------------
import { WindowComponent } from './components/window/window.component';
import { ContactComponent } from './components/contact/contact.component';
import { BookComponent } from './components/book/book.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { HttpClientModule } from '@angular/common/http';
import { WindowService } from './services/window.service';
import { AdminComponent } from './components/admin/admin.component';
import { AdminClientComponent } from './components/admin-client/admin-client.component';
import { UserFilesComponent } from './components/user-files/user-files.component';
import { StoreComponent } from './components/store/store.component';
import { UserPasswordresetComponent } from './components/user-passwordreset/user-passwordreset.component';
import { UserEmailresetComponent } from './components/user-emailreset/user-emailreset.component';
import { UserUploadfileComponent } from './components/user-uploadfile/user-uploadfile.component';
import { StartProjectComponent } from './components/start-project/start-project.component';
import { JoinprojectComponent } from './components/joinproject/joinproject.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ContactPostComponent } from './components/contact-post/contact-post.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectFilesComponent } from './components/project-files/project-files.component';
import { ProjectSettingsComponent } from './components/project-settings/project-settings.component';
import { FilenamePipe } from './pipes/filenamePipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    LoginComponent,
    UploadComponent,
    RegisterComponent,
    AccountComponent,
    ProjectAddComponent,
    ProjectManageComponent,
    WindowComponent,
    ContactComponent,
    BookComponent,
    RentalsComponent,
    AdminComponent,
    AdminClientComponent,
    UserFilesComponent,
    StoreComponent,
    UserPasswordresetComponent,
    UserEmailresetComponent,
    UserUploadfileComponent,
    StartProjectComponent,
    JoinprojectComponent,
    UserInfoComponent,
    PrettyJsonPipe,
    FilenamePipe,
    ContactPostComponent,
    ProjectListComponent,
    ProjectFilesComponent,
    ProjectSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    RouterModule,
    RouterModule.forRoot([]),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // angular material modules
    MatButtonModule, MatDialogModule, MatDialogModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatPaginatorModule, MatRadioModule, MatExpansionModule, MatProgressSpinnerModule, MatNativeDateModule, MatProgressBarModule, MatSliderModule, MatIconModule
  ],
  providers: [MatNativeDateModule, AudioContext, WindowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
