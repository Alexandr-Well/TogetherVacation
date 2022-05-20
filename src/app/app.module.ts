import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TasksComponent } from './tasks/tasks.component';
import { SelectorComponent } from './selector/selector.component';
import { FriendsComponent } from './friends/friends.component';
import { MomentPipe } from './service/moment.pipe'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { UserService } from './service/user.service'


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    TasksComponent,
    SelectorComponent,
    FriendsComponent,
    MomentPipe,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,


  ],
  providers: [UserService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
