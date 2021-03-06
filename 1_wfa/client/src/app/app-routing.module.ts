import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { ContactComponent } from './components/contact/contact.component';
import { HighlightsComponent } from './components/highlights/highlights.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [
  { path: '',           component: LandingComponent },
  { path: 'upload',     component: UploadComponent  },
  { path: 'contact',    component: ContactComponent },
  { path: 'book',       component: BookComponent    },
  { path: 'rentals',    component: RentalsComponent },
  { path: 'highlights', component: HighlightsComponent },
  { path: 'login',      component: LoginComponent   },
  { path: 'register',   component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
