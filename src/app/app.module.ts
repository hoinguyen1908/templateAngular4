import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule }       from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { ChartsModule } from 'ng2-charts';
import { CalendarModule } from 'angular-calendar';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AppRoutingModule, routedComponents} from './app-routing/app-routing.module'
import { I18nService } from './service/translation/i18n-service.service'


import { AppComponent } from './app.component';
import { HomeComponent } from './components/main/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {Broadcaster} from "./service/broadcaster/broadcaster.service";
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from "./service/auth/auth-guard.service"
import { AuthService } from "./service/auth/auth.service"
import { HttpService } from './service/http/http-service.service'
import { HttpRequestService } from './service/http/http-request.service'
import { SocketService } from "./service/socket/socket.service";
import { NavbarComponent } from './components/navbar/navbar.component';
import { TransactionComponent } from './components/main/transaction/transaction.component';
import { UsersComponent } from './components/main/users/users.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    routedComponents,
    SidebarComponent,
    LoginComponent,
    MainComponent,
    NavbarComponent,
    TransactionComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpModule,
    TranslateModule.forRoot(),
    NgbModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    Ng2DeviceDetectorModule.forRoot(),
    ChartsModule,
    CalendarModule.forRoot(),
    Ng2SmartTableModule
  ],
  providers: [
    I18nService,
    Broadcaster,
    AuthGuard,
    AuthService,
    SocketService,
    HttpService,
    HttpRequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
