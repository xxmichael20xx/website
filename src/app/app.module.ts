import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Global } from './global.';
import { CommonService } from './services/common.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthComponent } from './auth/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectsComponent } from './dashboard/projects/projects.component';
import { LogsComponent } from './dashboard/logs/logs.component';
import { ConfirmDialogComponent } from './element/confirm-dialog/confirm-dialog.component';
import { DashInfoComponent } from './dashboard/dash-info/dash-info.component';
import { ViewProjectComponent } from './element/view-project/view-project.component';
import { ProjectFormComponent } from './dashboard/project-form/project-form.component';
import { TrashedProjectsComponent } from './dashboard/trashed-projects/trashed-projects.component';
import { AboutMeComponent } from './home/about-me/about-me.component';
import { ContactComponent } from './home/contact/contact.component';
import { HomeProjectsComponent } from './home/home-projects/home-projects.component';
import { HomeComponent } from './home/home/home.component';
import { CmsComponent } from './dashboard/cms/cms.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    DashboardComponent,
    ProjectsComponent,
    LogsComponent,
    ConfirmDialogComponent,
    DashInfoComponent,
    ViewProjectComponent,
    ProjectFormComponent,
    TrashedProjectsComponent,
    AboutMeComponent,
    ContactComponent,
    HomeProjectsComponent,
    HomeComponent,
    CmsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSliderModule
  ],
  providers: [
    Global, 
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
