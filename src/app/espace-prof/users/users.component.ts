import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {UserService} from '../../controller/service/user.service';
import {User} from '../../controller/model/user.model';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {Etudiant} from '../../controller/model/etudiant.model';

import 'datatables.net-buttons/js/buttons.colVis.min';
import 'datatables.net-buttons/js/dataTables.buttons.min';
import 'datatables.net-buttons/js/buttons.flash.min';
import 'datatables.net-buttons/js/buttons.html5.min';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  dtOptions: any = {};
  usersTable: User[] = [];

  showModalUpdateUser = false;
  showModalUpdateUserConfirmation = false;

  french = {
    emptyTable: 'Aucune donnée n est disponible dans la table',
    info: 'Page _PAGE_ sur _PAGES_',
    infoEmpty: '0 à 0 de 0 entrées sont affichées',
    infoFiltered: '(filtré à partir d un total de _MAX_ entrées)',
    infoPostFix: '',
    infoThousands: ' ',
    loadingRecords: 'Chargement...',
    lengthMenu: 'Afficher _MENU_ entrées',
    processing: 'Chargement...',
    search: 'chercher',
    url: '',
    zeroRecords: 'Aucune ligne ne correspond à la recherche',
    paginate: {
      first: 'premier',
      previous: 'précédent',
      next: 'suivant',
      last: 'dernier'
    },
    aria: {
      sortAscending: ': Tri croissant',
      sortDescending: ': Tri décroissant'
    }
  };

  constructor(private userService: UserService, private etudiantService: EtudiantService, private router: Router) { }

  ngOnInit(): void {
    //this.userService.userIsLogged = true;
    this.router.navigateByUrl('/espace-prof/users', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/espace-prof/users']);
    });
    this.etudiantService.findAll();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: this.french,
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        { extend: 'colvis', text: 'Colonnes'},
        { extend: 'copy', text: 'Copier', title: 'FSTG_Etudiants_Inscrits'},
        { extend: 'print', text: 'Imprimer', title: 'FSTG_Etudiants_Inscrits'},
        { extend: 'excel', text: 'Excel', title: 'FSTG_Etudiants_Inscrits'},
      ]
    };
  }

  /*get users(): Array<User> {
    return this.userService.users;
  }
  get user(): User {
    return this.userService.user;
  }
  public  recover(u: User, id: number) {
    this.userService.recover(u, id);
  }
  public  update(id: number, login: string, nom: string, prenom: string, email: string) {
    this.userService.update(id, login, nom, prenom, email);
  }
  get dtTrigger(): Subject<any> {
    return this.userService.dtTrigger;
  }*/


  get etudiants(): Array<Etudiant> {
    return this.etudiantService.etudiants;
  }
  get etudiant(): Etudiant {
    return this.etudiantService.etudiant;
  }
  public  recover(e: Etudiant, id: number) {
    this.etudiantService.recover(e, id);
  }
  public  update(id: number, cne: string, nom: string, prenom: string, email: string) {
    this.etudiantService.update(id, cne, nom, prenom, email);
  }
  get dtTrigger(): Subject<any> {
    return this.etudiantService.dtTrigger;
  }
}
