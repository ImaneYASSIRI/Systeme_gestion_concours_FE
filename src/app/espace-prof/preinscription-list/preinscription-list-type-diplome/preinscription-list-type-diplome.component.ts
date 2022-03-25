import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Inscription} from '../../../controller/model/inscription.model';
import {PreinscriptionListService} from '../../../controller/service/preinscription-list.service';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {Subject} from 'rxjs';
import {TypeDiplome} from '../../../controller/model/type-diplome.model';
import * as XLSX from 'xlsx';
import {UserService} from '../../../controller/service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-preinscription-list-type-diplome',
  templateUrl: './preinscription-list-type-diplome.component.html',
  styleUrls: ['./preinscription-list-type-diplome.component.css']
})

export class PreinscriptionListTypeDiplomeComponent implements OnInit {

  fileName = 'ExcelSheet.xlsx';
  dtOptions: any = {};
  inscriptions: Inscription[] = [];

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

  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(private preinscriptionListService: PreinscriptionListService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    //this.userService.userIsLogged = true;
    this.preinscriptionListService.getTypeDiplomes();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      language: this.french,
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        { extend: 'colvis', text: 'Colonnes'},
        { extend: 'copy', text: 'Copier', title: 'FSTG_Etudiants_Préinscrits_Diplome'},
        { extend: 'print', text: 'Imprimer', title: 'FSTG_Etudiants_Préinscrits_Diplome'},
        { extend: 'excel', text: 'Excel', title: 'FSTG_Etudiants_Préinscrits_Diplome'},
      ]
    };
    this.router.navigateByUrl('/espace-prof/preinscriptionlist/type-diplome', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/espace-prof/preinscriptionlist/type-diplome']);
    });
  }

  public findEtudiantsByTypeDiplomeLibelle(event) {
    const libelleTypeDiplome = event.target.value;
    this.preinscriptionListService.findEtudiantsByTypeDiplomeLibelle(libelleTypeDiplome);
  }

  get typeDiplomes(): Array<TypeDiplome> {
    return this.preinscriptionListService.typeDiplomes;
  }

  get etudiants(): Array<Etudiant> {
    return this.preinscriptionListService.etudiants;
  }

  get typeDiplomeSelected(): TypeDiplome {
    return this.preinscriptionListService.typeDiplomeSelected;
  }

  get typeDiplome(): TypeDiplome {
    return this.preinscriptionListService.typeDiplome;
  }
  get dtTrigger2(): Subject<any> {
    return this.preinscriptionListService.dtTrigger2;
  }

  exportexcel(): void {
    /* table id is passed over here */
    const element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
