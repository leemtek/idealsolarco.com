import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

// Custom Modules
import { ReCaptchaModule } from 'angular2-recaptcha';

import { EmailComponent } from "./email/email.component";

@NgModule({
  declarations: [
    EmailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ReCaptchaModule
  ],
  providers: [],
  bootstrap: [EmailComponent]
})
export class AppModule { }
