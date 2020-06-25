import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthComponent } from './auth/auth/auth.component';
import { LogsComponent } from './dashboard/logs/logs.component';
import { Auth } from './auth';
import { DashInfoComponent } from './dashboard/dash-info/dash-info.component';
import { ProjectsComponent } from './dashboard/projects/projects.component';
import { AboutMeComponent } from './home/about-me/about-me.component';
import { HomeProjectsComponent } from './home/home-projects/home-projects.component';
import { ContactComponent } from './home/contact/contact.component';
import { HomeComponent } from './home/home/home.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { CmsComponent } from './dashboard/cms/cms.component';


const routes: Routes = [
  {
    path: "info",
    component: HomeComponent,
    children: [
      {
        path: "",
        redirectTo: "about-me",
        pathMatch: "full"
      },
      {
        path: "about-me",
        component: AboutMeComponent
      },
      {
        path: "projects",
        component: HomeProjectsComponent
      },
      {
        path: "contact",
        component: ContactComponent
      }
    ]
  },
  {
    path: "authenticate", 
    component: AuthComponent,
    children: [
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
      },
      {
        path: "login", 
        component: LoginComponent
      },
      {
        path: "signup", 
        component: RegisterComponent
      }
    ]
  },
  {
    path: "dashboard", 
    component: DashboardComponent,
    canActivate: [Auth],
    children: [
      {
        path: "",
        redirectTo: "info",
        pathMatch: "full"
      },
      {
        path: "info",
        component: DashInfoComponent,
        canActivateChild: [Auth]
      },
      {
        path: "logs",
        component: LogsComponent,
        canActivateChild: [Auth]
      },
      {
        path: "projects",
        component: ProjectsComponent,
        canActivateChild: [Auth]
      },
      {
        path: "cms",
        component: CmsComponent,
        canActivateChild: [Auth]
      }
    ]
  },
  {
    path: "**",
    redirectTo: "info",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
