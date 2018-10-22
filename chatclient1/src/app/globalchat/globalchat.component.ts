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

  username: string = localStorage.getItem('username');
  input:string; //bind to input field
  messages = [{timestamp: this.getTime(), user: "Server", msg:"Welcome "+this.username+"!"}]; //bind to message list
  chatservice: ChatService;
  chat: string= 'global';

  constructor(private router: Router) {
    this.chatservice = new ChatService();
    
  }

  ngOnInit() {
    if(this.username == null) {
      this.router.navigate([''])
    }
    this.chatservice.join({user: this.username, chat:this.chat});
    this.chatservice.getMessages().subscribe((message) => {
      this.messages.unshift(message);
    })
  }

  onSubmit() {
      
    if(this.input == "/list")
    {

    } else {
      this.chatservice.sendMessage(this.chat, this.input);
    }
    this.input = "";
  }

  getTime() {
    return moment().format('hh:mm A') + "";
  }

  backToLogin() {
    this.router.navigate(['']);
  }
}
