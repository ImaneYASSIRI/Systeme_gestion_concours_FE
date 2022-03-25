import { Component, OnInit } from '@angular/core';
import {Concours} from '../../../controller/model/concours.model';
import {ConcoursService} from '../../../controller/service/concours.service';
import {Subject} from 'rxjs';
import {ConfigConcours} from '../../../controller/model/config-concours.model';
import {TypeDiplome} from '../../../controller/model/type-diplome.model';
import {UserService} from '../../../controller/service/user.service';

@Component({
  selector: 'app-concours-list',
  templateUrl: './concours-list.component.html',
  styleUrls: ['./concours-list.component.css']
})
export class ConcoursListComponent implements OnInit {

  dtOptions: any = {};
  concourssTable: Concours[] = [];
  configConcourssTable: ConfigConcours[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  showModalUpdateConcours = false;
  showModalUpdateConcoursConfirmation = false;
  showModalDeleteConcoursConfirmation = false;
  showModalUpdateConfigConcours = false;
  showModalUpdateConfigConcoursConfirmation = false;
  showModalDeleteConfigConcoursConfirmation = false;

  cancelClicked = false;
  popoverMessage = 'Êtes-vous sûr de vouloir supprimer le concours ?';
  popoverTitle = 'CONFIRMATION';

  popoverMessageConfig = 'Êtes-vous sûr de vouloir supprimer la configuration ?';

  french = {
    emptyTable: 'Aucune donnée disponible dans le tableau',
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

  constructor(private concoursService: ConcoursService, private userService: UserService) { }

  ngOnInit(): void {
    //this.userService.userIsLogged = true;
    this.concoursService.findAll();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      language: this.french,
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        { extend: 'colvis', text: 'Colonnes'},
        { extend: 'copy', text: 'Copier', title: 'FSTG_Concours'},
        { extend: 'print', text: 'Imprimer', title: 'FSTG_Concours'},
        { extend: 'excel', text: 'Excel', title: 'FSTG_Concours'},
      ]
    };
  }

  get concourss(): Array<Concours> {
    return this.concoursService.concourss;
  }
  get concours(): Concours {
    return  this.concoursService.concours;
  }
  get concours2(): Concours {
    return  this.concoursService.concours2;
  }
  get concoursSelected(): Concours {
    return this.concoursService.concoursSelected;
  }
  get typeDiplomes(): Array<TypeDiplome> {
    return this.concoursService.typeDiplomes;
  }
  get configConcours2(): ConfigConcours {
    return  this.concoursService.configConcours2;
  }
  public findConfigConcoursByConcoursReference(concours: Concours) {
    this.concoursService.findConfigConcoursByConcoursReference(concours);
  }
  public deleteByReference(concours: Concours) {
    this.concoursService.deleteByReference(concours);
  }
  public  deleteConfigConcoursById(conf: ConfigConcours) {
    this.concoursService.deleteConfigConcoursById(conf);
  }
  public recover(c: Concours, id: number) {
    this.concoursService.recover(c, id);
  }
  public update(id: number, reference: string, annee: number, dateOrale: Date, dateEcrit: Date, nbreEtudiantAdmisOrale: number,
                nbreEtudiantAdmisEcrit: number, nbreEtudiantAdmis: number, description: string) {
    this.concoursService.update(id, reference, annee, dateOrale, dateEcrit, nbreEtudiantAdmisOrale, nbreEtudiantAdmisEcrit, nbreEtudiantAdmis, description);
  }
  public recoverConfigConcours(conf: ConfigConcours, id: number) {
    this.concoursService.recoverConfigConcours(conf, id);
  }
  public updateConfigConcours(id: number,  noteMin: number, nbreMaxAdmis: number, nbreMaxEcritAdmis: number, nbreMaxOraleAdmis: number) {
    this.concoursService.updateConfigConcours(id, noteMin, nbreMaxAdmis, nbreMaxEcritAdmis, nbreMaxOraleAdmis);
  }
  get dtTrigger(): Subject<any> {
    return this.concoursService.dtTrigger;
  }
  get dtTrigger2(): Subject<any> {
    return this.concoursService.dtTrigger2;
  }

}
