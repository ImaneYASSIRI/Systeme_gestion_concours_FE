import { Component, OnInit } from '@angular/core';
import {UserService} from '../../controller/service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-type-diplome',
  templateUrl: './type-diplome.component.html',
  styleUrls: ['./type-diplome.component.css']
})
export class TypeDiplomeComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    //this.userService.userIsLogged = true;
    this.router.navigateByUrl('/espace-prof/type-diplome', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/espace-prof/type-diplome']);
    });
  }

}
