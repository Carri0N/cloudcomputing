import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  regex: string = '^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$';
  inputWarning: string = "";
  serverMessage: string = "";
  username: string;

  constructor(private router: Router) { }

  ngOnInit() { }

  onSubmit() {
    if(this.valid(this.username)) {

    }
  }

  valid(name:string): boolean {
    var regex = new RegExp(this.regex);
    return regex.test(name);
  }

  redirect(): void {
    this.router.navigate(['/chat']);
  }
}
