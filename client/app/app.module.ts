import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {BrowserModule} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpModule, Http} from "@angular/http";
import { Ng2SmartTableModule } from 'ng2-smart-table';

//component


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TableComponent } from './tables/table.component';
import { SignInComponent } from './auth/signin/signin.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { ItemComponent } from './items/item.component';
import { RukuComponent } from './ruku/ruku.component';
import { ChukuComponent } from './chuku/chuku.component';
import { SummaryComponent } from './summary/summary.component';
import { ChatComponent } from './chat/chat.component';


//service

import { DataService } from './home/services/data.service';
import { AuthService } from './auth/auth.service';
import { ItemService } from './items/item.service';
import { RukuService } from './ruku/ruku.service';
import { ChukuService } from './chuku/chuku.service';
import { SummaryService } from './summary/summary.service';
import { ChatService } from './chat/chat.service';

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, "../assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TableComponent,
    SignInComponent,
    SignUpComponent,
    ItemComponent,
    RukuComponent,
    ChukuComponent,
    SummaryComponent,
    ChatComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    HttpModule,
    Ng2SmartTableModule,
    TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [Http]
          }
    })
  ],
  providers: [
    DataService,
    AuthService,
    ItemService,
    RukuService,
    ChukuService,
    SummaryService,
    ChatService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
