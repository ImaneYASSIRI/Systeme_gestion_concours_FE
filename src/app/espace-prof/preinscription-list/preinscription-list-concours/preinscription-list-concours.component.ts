import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Inscription} from '../../../controller/model/inscription.model';
import {PreinscriptionListService} from '../../../controller/service/preinscription-list.service';
import {Concours} from '../../../controller/model/concours.model';
import {ConfigConcours} from '../../../controller/model/config-concours.model';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {Subject} from 'rxjs';
import * as XLSX from 'xlsx';
import {UserService} from '../../../controller/service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-preinscription-list-concours',
  templateUrl: './preinscription-list-concours.component.html',
  styleUrls: ['./preinscription-list-concours.component.css']
})
export class PreinscriptionListConcoursComponent implements OnInit {

  fileName = 'ExcelSheet.xlsx';
  dtOptions: any = {};
  inscriptions: Inscription[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering

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
    this.preinscriptionListService.getConcourss();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      language: this.french,
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        { extend: 'colvis', text: 'Colonnes'},
        { extend: 'copy', text: 'Copier', title: 'FSTG_Etudiants_Préinscrits_Concours'},
        { extend: 'print', text: 'Imprimer', title: 'FSTG_Etudiants_Préinscrits_Concours'},
        { extend: 'excel', text: 'Excel', title: 'FSTG_Etudiants_Préinscrits_Concours'},
      ]
    };
    this.router.navigateByUrl('/espace-prof/preinscriptionlist/concours', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/espace-prof/preinscriptionlist/concours']);
    });
  }

  public findEtudiantsByConcoursReference(event) {
    const descConcours = event.target.value;
    this.preinscriptionListService.findEtudiantsByConcoursReference(descConcours);
  }

  get concourss(): Array<Concours> {
    return this.preinscriptionListService.concourss;
  }

  get configConcourss(): Array<ConfigConcours> {
    return this.preinscriptionListService.configConcourss;
  }

  get etudiants(): Array<Etudiant> {
    return this.preinscriptionListService.etudiants;
  }

  get concoursSelected(): Concours {
    return this.preinscriptionListService.concoursSelected;
  }

  get concours(): Concours {
    return this.preinscriptionListService.concours;
  }

  get dtTrigger(): Subject<any> {
    return this.preinscriptionListService.dtTrigger;
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
