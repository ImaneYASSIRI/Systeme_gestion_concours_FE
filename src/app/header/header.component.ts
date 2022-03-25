import { Component, OnInit } from '@angular/core';
import {Etudiant} from '../controller/model/etudiant.model';
import {EtudiantService} from '../controller/service/etudiant.service';
import {UserService} from '../controller/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private etudiantService: EtudiantService, private userService: UserService) { }

  ngOnInit(): void {
  }

  get isLogged(): boolean {
    return  this.etudiantService.isLogged;
  }

  get userIsLogged(): boolean {
    return  this.userService.userIsLogged;
  }

  public userLogOut() {
    this.userService.userLogOut();
  }

  public logOut() {
    this.etudiantService.logOut();
  }
}
