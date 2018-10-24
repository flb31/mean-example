import { ModuleWithProviders } from '@angular/core';
import { Routes, CanActivate, RouterModule } from '@angular/router';

import { MyaccountComponent } from '../components/myaccount/myaccount.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { LandingComponent } from '../components/landing/landing.component';
import { PlayerComponent } from '../components/player/player.component';

import {  AuthGuardService as AuthGuard } from '../auth/auth.guard.service';

export const APP_ROUTES: Routes = [
    { path: '', component: LandingComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'player', component: PlayerComponent, canActivate: [AuthGuard]},
    { path: 'my-account', component: MyaccountComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: '' }
];
