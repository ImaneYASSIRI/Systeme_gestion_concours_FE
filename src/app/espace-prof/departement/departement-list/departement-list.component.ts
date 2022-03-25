import { Component, OnInit } from '@angular/core';
import {Departement} from '../../../controller/model/departement.model';
import {DepartementService} from '../../../controller/service/departement.service';
import {Concours} from '../../../controller/model/concours.model';
import {Subject} from 'rxjs';
import {ConfigConcours} from '../../../controller/model/config-concours.model';
import {Filiere} from '../../../controller/model/filiere.model';
import {TypeDiplome} from '../../../controller/model/type-diplome.model';
import {UserService} from '../../../controller/service/user.service';

@Component({
  selector: 'app-departement-list',
  templateUrl: './departement-list.component.html',
  styleUrls: ['./departement-list.component.css']
})
export class DepartementListComponent implements OnInit {

  dtOptions: any = {};
  departementTable: Departement[] = [];
  filieresTable: Filiere[] = [];

  showModalUpdateDepartement = false;
  showModalUpdateDepartementConfirmation = false;
  showModalDeleteDepartementConfirmation = false;
  showModalUpdateFiliere = false;
  showModalUpdateFiliereConfirmation = false;
  showModalDeleteFiliereConfirmation = false;

  cancelClicked = false;
  popoverMessage = 'Êtes-vous sûr de vouloir supprimer le département ?';
  popoverTitle = 'CONFIRMATION';

  popoverMessageFiliere = 'Êtes-vous sûr de vouloir supprimer la filière ?';

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

  constructor(private departementService: DepartementService, private userService: UserService) { }

  ngOnInit(): void {
    //this.userService.userIsLogged = true;
    this.departementService.findAll();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      language: this.french,
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        { extend: 'colvis', text: 'Colonnes'},
        { extend: 'copy', text: 'Copier', title: 'FSTG_Départements'},
        { extend: 'print', text: 'Imprimer', title: 'FSTG_Départements'},
        { extend: 'excel', text: 'Excel', title: 'FSTG_Départements'},
      ]
    };
  }

  get departements(): Array<Departement> {
    return this.departementService.departements;
  }
  get departementSelected(): Departement {
    return this.departementService.departementSelected;
  }
  get departement(): Departement {
    return this.departementService.departement;
  }
  get departement2(): Departement {
    return this.departementService.departement2;
  }
  public findFiliereByDepartementReference(dep: Departement) {
    this.departementService.findFiliereByDepartementReference(dep);
  }
  public  deleteByReference(dep: Departement) {
    this.departementService.deleteByReference(dep);
  }
  public  deleteFiliereById(fil: Filiere) {
    this.departementService.deleteFiliereById(fil);
  }
  public recover(d: Departement, id: number) {
    this.departementService.recover(d, id);
  }
  public update(id: number, nom: string, reference: string, description: string, chef: string) {
    this.departementService.update(id, nom, reference, description, chef);
  }
  public recoverFiliere(f: Filiere, id: number) {
    this.departementService.recoverFiliere(f, id);
  }
  public updateFiliere(id: number, libelle: string, description: string, responsable: string) {
    this.departementService.updateFiliere(id, libelle, description, responsable);
  }
  get filiere2(): Filiere {
    return this.departementService.filiere2;
  }
  get dtTrigger(): Subject<any> {
    return this.departementService.dtTrigger;
  }
  get dtTrigger2(): Subject<any> {
    return this.departementService.dtTrigger2;
  }
}
