import * as io from 'socket.io-client';
import { Observable, Subject, pipe } from 'rxjs';

export class ChatService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  public join(info) {
    this.socket.emit('join', info);
  }

  public sendMessage(chatroom, message) {
    this.socket.emit('message', {chat: chatroom, msg: message});
  }

  public getList() {
    this.socket.emit('list');
  }

  public whisper(user1, message1) {
    this.socket.emit('whisper', {user: user1, msg:message1});
  }

  public sendFile(chatroom, message) {

  }

  public getMessages() {
    return Observable.create((observer) => {
      this.socket.on('message', (message) => {
        observer.next(message);
      });
    });
  }
}
