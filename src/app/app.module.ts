import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooleanComponent } from './base/boolean/boolean.component';
import { MultipleComponent } from './base/multiple/multiple.component';
import { TextComponent } from './base/text/text.component';
import { SummaryComponent } from './base/summary/summary.component';
import { BaseComponent } from './base/base.component';
import { ButtonComponent } from './base/button/button.component';
import { BaseService } from './base/base.service';

@NgModule({
  declarations: [
    AppComponent,
    BooleanComponent,
    MultipleComponent,
    TextComponent,
    SummaryComponent,
    BaseComponent,
    ButtonComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [BaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
