import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MzButtonModule,
  MzInputModule,
  MzValidationModule,
  MzDropdownModule,
  MzNavbarModule
} from 'ngx-materialize';

// Router
import { APP_ROUTES } from './router/app.router';
import { AuthGuardService as AuthGuard } from "./auth/auth.guard.service";
import { CommonService } from "./services/common.service";

// Custom component
import { AppComponent } from './app.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { HeaderComponent } from './components/header/header.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LandingComponent } from './components/landing/landing.component';
import { PlayerComponent } from './components/player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    MyaccountComponent,
    HeaderComponent,
    SignInComponent,
    SignUpComponent,
    LandingComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES),
    
    // Materialize
    MzInputModule,
    MzButtonModule,
    MzValidationModule,
    MzDropdownModule,
    MzNavbarModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
