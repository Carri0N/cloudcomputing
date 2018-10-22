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

  constructor(private router:Router) { }
  ngOnInit() { }

  onSubmit() {
    localStorage.setItem('username', this.username);
    this.username = "";
    this.router.navigate(['/chat'])
  }
}
