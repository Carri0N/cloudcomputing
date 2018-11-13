import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  messageText = "";

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.messageText = "";
  }

  onChange(event) {

  }
}
