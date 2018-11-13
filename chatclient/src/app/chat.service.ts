import * as io from 'socket.io-client';
import { Observable, Subject, pipe } from 'rxjs';

export class ChatService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  /**
   * adds user to chat
   * @param info (chat,user)
   */
  public join(info) {
    this.socket.emit('join', info);
  }

  /**
   * emits message in specific chatroom
   * @param chatroom 
   * @param message 
   */
  public sendMessage(chatroom, message) {
    this.socket.emit('message', {chat: chatroom, msg: message});
  }

  /**
   * requests list of all user from server
   */
  public getList() {
    this.socket.emit('list');
  }

  /**
   * emits message to one specific user
   * @param user1 
   * @param message1 
   */
  public whisper(user1, message1) {
    this.socket.emit('whisper', {user: user1, msg:message1});
  }

  public sendFile(chatroom, message) {

  }

  /**
   * lets everybody know that you left
   */
  public logout() {
    this.socket.emit('leave');
  }

  /**
   * recives the messages
   */
  public getMessages() {
    return Observable.create((observer) => {
      this.socket.on('message', (message) => {
        observer.next(message);
      });
    });
  }
}
