import { Component, OnInit } from '@angular/core';
import {UserService} from '../../controller/service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-concours',
  templateUrl: './concours.component.html',
  styleUrls: ['./concours.component.css']
})
export class ConcoursComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    //this.userService.userIsLogged = true;
    this.router.navigateByUrl('/espace-prof/concours', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/espace-prof/concours']);
    });
  }

}
