import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ValueNGComponent } from './valueNG/valueNG.component';
import {HttpClientModule} from '@angular/common/http';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [	
    AppComponent,
      ValueNGComponent,
      NavComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
