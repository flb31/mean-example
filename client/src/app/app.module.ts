import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MzButtonModule,
  MzInputModule,
  MzValidationModule,
  MzDropdownModule,
  MzNavbarModule
} from 'ngx-materialize';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // Materialize
    MzInputModule,
    MzButtonModule,
    MzValidationModule,
    MzDropdownModule,
    MzNavbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
