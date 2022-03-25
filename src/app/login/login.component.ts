import { Component, OnInit } from '@angular/core';
import {UserService} from '../controller/service/user.service';
import {Etudiant} from '../controller/model/etudiant.model';
import {User} from '../controller/model/user.model';
import {EtudiantService} from '../controller/service/etudiant.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(/*private userService: UserService,*/private etudiantService: EtudiantService) { }

  ngOnInit(): void {
  }

  /*get user2(): User {
    return  this.userService.user2;
  }
  get noAccount(): boolean {
    return  this.userService.noAccount;
  }
  get incorrectPwd(): boolean {
    return  this.userService.incorrectPwd;
  }
  get registration(): boolean {
    return  this.userService.registration;
  }
  public seConnecter() {
    this.userService.seConnecter();
  }
  get userExists(): boolean {
    return  this.userService.userExists;
  }*/
  get etudiant2(): Etudiant {
    return  this.etudiantService.etudiant2;
  }
  get noAccount(): boolean {
    return  this.etudiantService.noAccount;
  }
  get incorrectPwd(): boolean {
    return  this.etudiantService.incorrectPwd;
  }
  get registration(): boolean {
    return  this.etudiantService.registration;
  }
  public seConnecter() {
    this.etudiantService.seConnecter();
  }
  get etudiantExists(): boolean {
    return  this.etudiantService.etudiantExists;
  }

}
