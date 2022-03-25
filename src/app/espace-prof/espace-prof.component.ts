import { Component, OnInit } from '@angular/core';
import {UserService} from '../controller/service/user.service';
import {Router} from '@angular/router';
import {EtudiantService} from '../controller/service/etudiant.service';

@Component({
  selector: 'app-espace-prof',
  templateUrl: './espace-prof.component.html',
  styleUrls: ['./espace-prof.component.css']
})
export class EspaceProfComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.userIsLogged === false) {
      this.router.navigate(['/login-user']);
      //this.router.navigateByUrl('/login-user');
    }
  }

  get userIsLogged(): boolean {
    return  this.userService.userIsLogged;
  }

  public userLogOut() {
    this.userService.userLogOut();
  }
}
