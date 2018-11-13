import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public buttonName = 'Submit';
  public username: string;
  public inputWarning = "";

  constructor(private router:Router) { }
  ngOnInit() { }

  /**
   * handles username submission
   */
  onSubmit() {
    if(this.username == "" || this.username.length < 4 || this.username.length > 12 || this.username.split(' ').length > 1) {
      this.inputWarning = "Invalid Username (No spaces, min character: 4, max character 21)";
    } else {
      localStorage.setItem('username', this.username);
      this.username = "";
      this.router.navigate(['/chat'])
    }
    
  }
}
