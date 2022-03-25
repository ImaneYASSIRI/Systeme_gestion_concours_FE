import { Component, OnInit } from '@angular/core';
import {TypeDiplomeService} from '../../../controller/service/type-diplome.service';
import {TypeDiplome} from '../../../controller/model/type-diplome.model';
import {Subject} from 'rxjs';
import {UserService} from '../../../controller/service/user.service';

@Component({
  selector: 'app-type-diplome-list',
  templateUrl: './type-diplome-list.component.html',
  styleUrls: ['./type-diplome-list.component.css']
})
export class TypeDiplomeListComponent implements OnInit {

  dtOptions: any = {};
  typeDiplomesTable: TypeDiplome[] = [];

  showModalUpdateTypeDiplome = false;
  showModalUpdateTypeDiplomeConfirmation = false;
  showModalDeleteTypeDiplomeConfirmation = false;

  cancelClicked = false;
  popoverMessage = 'Êtes-vous sûr de vouloir supprimer le diplôme ?';
  popoverTitle = 'CONFIRMATION';

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

  constructor(private typeDiplomeService: TypeDiplomeService, private userService: UserService) { }

  ngOnInit(): void {
    //this.userService.userIsLogged = true;
    this.typeDiplomeService.findAll();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      language: this.french,
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        { extend: 'colvis', text: 'Colonnes'},
        { extend: 'copy', text: 'Copier', title: 'FSTG_diplômes'},
        { extend: 'print', text: 'Imprimer', title: 'FSTG_diplômes'},
        { extend: 'excel', text: 'Excel', title: 'FSTG_diplômes'},
        { extend: 'pdf', text: 'PDF', title: 'FSTG_diplômes'},
      ]
    };
  }

  get typeDiplomes(): Array<TypeDiplome> {
    return this.typeDiplomeService.typeDiplomes;
  }
  get typeDiplome2(): TypeDiplome {
    return this.typeDiplomeService.typeDiplome2;
  }
  get typeDiplome(): TypeDiplome {
    return this.typeDiplomeService.typeDiplome;
  }
  public  deleteByLibelle(td: TypeDiplome) {
    this.typeDiplomeService.deleteByLibelle(td);
  }
  public  recover(td: TypeDiplome, id: number) {
    this.typeDiplomeService.recover(td, id);
  }
  public  update(id: number, libelle: string, description: string) {
    this.typeDiplomeService.update(id, libelle, description);
  }
  get dtTrigger(): Subject<any> {
    return this.typeDiplomeService.dtTrigger;
  }
}


