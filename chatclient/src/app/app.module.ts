import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChatService } from './chat.service';
import { LoginComponent } from './login/login.component';
import { GlobalchatComponent } from './globalchat/globalchat.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { ChatDisplayComponent } from './chat-display/chat-display.component';
import { ChatFormComponent } from './chat-form/chat-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GlobalchatComponent,
    LoginFormComponent,
    ChatDisplayComponent,
    ChatFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
