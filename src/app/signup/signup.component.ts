import { Component, OnInit } from '@angular/core';
import {UserService} from '../controller/service/user.service';
import {User} from '../controller/model/user.model';
import {EtudiantService} from '../controller/service/etudiant.service';
import {Etudiant} from '../controller/model/etudiant.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(/*private userService: UserService,*/ private etudiantService: EtudiantService) { }

  ngOnInit(): void {
  }

  /*get user2(): User {
    return  this.userService.user2;
  }
  get userExists(): boolean {
    return  this.userService.userExists;
  }
  public registrer() {
    this.userService.registrer();
  }*/
  get etudiant2(): Etudiant {
    return  this.etudiantService.etudiant2;
  }
  get etudiantExists(): boolean {
    return  this.etudiantService.etudiantExists;
  }
  public registrer() {
    this.etudiantService.registrer();
  }
}
