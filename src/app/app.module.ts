import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { IntroSectionComponent } from './components/intro-section/intro-section.component';
import { FeaturedContentComponent } from './components/featured-content/featured-content.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContactComponent } from './components/contact/contact.component';
import { VictimComponent } from './pages/victim/victim.component';
import { VolunteerComponent } from './pages/volunteer/volunteer.component';
import { AboutComponent } from './pages/about/about.component';
import { SkillsComponent } from './pages/volunteer/skills/skills.component';
import { AssistanceOffersComponent } from './pages/volunteer/assistance-offers/assistance-offers.component';
import { MakeAssistanceOfferComponent } from './pages/volunteer/make-assistance-offer/make-assistance-offer.component';
import { AssistanceRequestsComponent } from './pages/volunteer/assistance-requests/assistance-requests.component';
import { AssistanceRequestsSeemoreComponent } from './pages/volunteer/assistance-requests-seemore/assistance-requests-seemore.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavBarComponent,
    FooterComponent,
    HeroComponent,
    IntroSectionComponent,
    FeaturedContentComponent,
    ContactComponent,
    VictimComponent,
    VolunteerComponent,
    AboutComponent,
    SkillsComponent,
    AssistanceOffersComponent,
    MakeAssistanceOfferComponent,
    AssistanceRequestsComponent,
    AssistanceRequestsSeemoreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
