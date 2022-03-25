import { Component, OnInit } from '@angular/core';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {UserService} from '../../controller/service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-commission-home',
  templateUrl: './commission-home.component.html',
  styleUrls: ['./commission-home.component.css']
})
export class CommissionHomeComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    /*this.router.navigateByUrl('/espace-prof/commission', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/espace-prof/commission']);
    });*/
   //this.userService.userIsLogged = true;
   /*if (this.userIsLogged === false) {
      this.router.navigate(['/login-user']);
    }*/
  }

  get userIsLogged(): boolean {
    return  this.userService.userIsLogged;
  }
}
