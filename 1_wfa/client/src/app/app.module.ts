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
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WindowComponent } from './components/window/window.component';
import { ContactComponent } from './components/contact/contact.component';
import { BookComponent } from './components/book/book.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { HighlightsComponent } from './components/highlights/highlights.component';
import { HttpClientModule } from '@angular/common/http';
import { WindowService } from './services/window.service';
import { AdminComponent } from './components/admin/admin.component';
import { AdminClientComponent } from './components/admin-client/admin-client.component';
import { UserFilesComponent } from './components/user-files/user-files.component';
import { StoreComponent } from './components/store/store.component';
import { UserPasswordresetComponent } from './components/user-passwordreset/user-passwordreset.component';
import { UserEmailresetComponent } from './components/user-emailreset/user-emailreset.component';
import { UserPlanComponent } from './components/user-plan/user-plan.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserMessagesComponent } from './components/user-messages/user-messages.component';
import { UserQuestionComponent } from './components/user-question/user-question.component';
import { FaqAccountComponent } from './components/faq-account/faq-account.component';
import { ReportComponent } from './components/report/report.component';
import { UserUploadfileComponent } from './components/user-uploadfile/user-uploadfile.component';
import { SuggestComponent } from './components/suggest/suggest.component';
import { UserCommunicationsComponent } from './components/user-communications/user-communications.component';
import { StartProjectComponent } from './components/start-project/start-project.component';

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
    HighlightsComponent,
    AdminComponent,
    AdminClientComponent,
    UserFilesComponent,
    StoreComponent,
    UserPasswordresetComponent,
    UserEmailresetComponent,
    UserPlanComponent,
    UserOrdersComponent,
    UserMessagesComponent,
    UserQuestionComponent,
    FaqAccountComponent,
    ReportComponent,
    UserUploadfileComponent,
    SuggestComponent,
    UserCommunicationsComponent,
    StartProjectComponent
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
    MatButtonModule, MatDialogModule, MatDialogModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatPaginatorModule, MatRadioModule, MatExpansionModule, MatProgressSpinnerModule
  ],
  providers: [MatNativeDateModule, AudioContext, WindowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
