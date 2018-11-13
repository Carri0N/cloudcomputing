import { Component, OnInit} from '@angular/core';
import { ChatService } from '../chat.service';
import * as moment from "moment";
import { Router } from '@angular/router';

@Component({
  selector: 'app-globalchat',
  templateUrl: './globalchat.component.html',
  styleUrls: ['./globalchat.component.css']
})
export class GlobalchatComponent implements OnInit {

  filename: string = "";
  username: string = localStorage.getItem('username');
  input:string; //bind to input field
  messages = []; //bind to message list
  chatservice: ChatService;
  chat: string= 'global';

  constructor(private router: Router) {
    this.chatservice = new ChatService();
  }

  /**
   * checks valid session and joins user to global chat
   * subscribes to chat service to get updates on messages
   */
  ngOnInit() {
    if(this.username == null || this.username == undefined) {
      this.backToLogin();
    }
    this.chatservice.join({user: this.username, chat:this.chat});
    this.chatservice.getMessages().subscribe((message) => {
      this.messages.unshift(message);
    })
  }

  /**
   * handles user input.
   * calls the right function if input is a command, else emit message
   */
  onSubmit() {
    if(this.input == "\\list"){
      this.chatservice.getList();
    } else if(this.input == "\\help") {
      this.messages.unshift({timestamp: "HELP", user: "Command", msg: "\\help => lists commands"});
      this.messages.unshift({timestamp: "HELP", user: "Command", msg: "\\list => lists all users"});
      this.messages.unshift({timestamp: "HELP", user: "Command", msg: "\\whisper <Username> <Message> => sends message to one user only"});
    } else if(this.input.split(' ')[0] == "\\whisper") {
      var data = this.input.split(' ');
      if(data.length >= 3) {
        var user = data[1];
        var msg = "";
        for (let index = 2; index < data.length; index++) {
          msg += data[index] + " "; 
        }
        this.chatservice.whisper(user, msg);
      }
    }else {
      if(this.filename != "") {

      }
      this.chatservice.sendMessage(this.chat, this.input);
    }
    this.input = "";
  }

  /**
   * Handles file inputs TODO
   */
  onChange(event) {
    this.filename = event.target.value.split('\\')[event.target.value.split('\\').length - 1];
  }

  /**
   * routes user to login
   */
  backToLogin() {
    this.router.navigate(['']);
  }
}
