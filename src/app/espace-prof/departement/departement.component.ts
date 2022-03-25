import { Component, OnInit } from '@angular/core';
import {UserService} from '../../controller/service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    //this.userService.userIsLogged = true;
    this.router.navigateByUrl('/espace-prof/departement', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/espace-prof/departement']);
    });
  }

}
