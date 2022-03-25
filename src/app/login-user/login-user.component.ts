import { Component, OnInit } from '@angular/core';
import {User} from '../controller/model/user.model';
import {UserService} from '../controller/service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  get userIsLogged(): boolean {
    return  this.userService.userIsLogged;
  }
  get user(): User {
    return  this.userService.user;
  }
  get incorrectPwd(): boolean {
    return  this.userService.incorrectPwd;
  }
  public seConnecter() {
    this.userService.seConnecter();
  }
}
