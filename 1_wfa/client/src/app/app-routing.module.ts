import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AdminComponent } from './components/admin/admin.component';
import { BookComponent } from './components/book/book.component';
import { ContactComponent } from './components/contact/contact.component';
import { HighlightsComponent } from './components/highlights/highlights.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { UploadComponent } from './components/upload/upload.component';
import { RouteMetrics } from './route-guard';

const routes: Routes = [
  { path: '',           component: LandingComponent, canActivate: [RouteMetrics] },
  { path: 'upload',     component: UploadComponent, canActivate: [RouteMetrics]  },
  { path: 'account',    component: AccountComponent, canActivate: [RouteMetrics] },
  { path: 'admin',      component: AdminComponent, canActivate: [RouteMetrics]   },
  { path: 'contact',    component: ContactComponent, canActivate: [RouteMetrics] },
  { path: 'book',       component: BookComponent, canActivate: [RouteMetrics]    },
  { path: 'rentals',    component: RentalsComponent, canActivate: [RouteMetrics] },
  { path: 'highlights', component: HighlightsComponent, canActivate: [RouteMetrics] },
  { path: 'login',      component: LoginComponent, canActivate: [RouteMetrics]   },
  { path: 'register',   component: RegisterComponent, canActivate: [RouteMetrics]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
