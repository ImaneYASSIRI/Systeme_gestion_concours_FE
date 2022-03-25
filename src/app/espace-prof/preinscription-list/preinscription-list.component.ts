import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../controller/service/user.service';

@Component({
  selector: 'app-preinscription-list',
  templateUrl: './preinscription-list.component.html',
  styleUrls: ['./preinscription-list.component.css']
})
export class PreinscriptionListComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    //this.userService.userIsLogged = true;

    this.router.navigateByUrl('/espace-prof/preinscriptionlist', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/espace-prof/preinscriptionlist']);
    });
  }

}
