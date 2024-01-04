import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { VictimComponent } from './pages/victim/victim.component';
import { VolunteerComponent } from './pages/volunteer/volunteer.component';
import { SkillsComponent } from './pages/volunteer/skills/skills.component';
import { AssistanceOffersComponent } from './pages/volunteer/assistance-offers/assistance-offers.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'about', component: AboutComponent },
  {
    path: 'volunteer',
    component: VolunteerComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'skills',
        component: SkillsComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'assistance-offers',
        component: AssistanceOffersComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
  {
    path: 'victim',
    component: VictimComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
