import { Injectable } from '@angular/core';
import {Departement} from '../model/departement.model';
import {HttpClient} from '@angular/common/http';
import {Filiere} from '../model/filiere.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  private _departement: Departement;
  private _departement2: Departement;
  private _filiere: Filiere;
  private _filiere2: Filiere;
  private _filieres: Array<Filiere>;
  private _departements: Array<Departement> ;
  private _departementSelected: Departement;

  private _departementExists = false;

  private _urlFiliere = 'http://localhost:8090/pfe-concours-v3-api/filiere/';
  private _urlDepartement = 'http://localhost:8090/pfe-concours-v3-api/departement/';

  dtTrigger: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();

  constructor(private http: HttpClient) { }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  ngOnDestroy2(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger2.unsubscribe();
  }

  public addFiliere() {
    this.departement.filieres.push(this.cloneFiliere(this.filiere));
    this.filiere = null;
  }

  //?
  private cloneFiliere(filiere: Filiere) {
    const myClone = new Filiere();
    myClone.libelle = filiere.libelle;
    myClone.description = filiere.description;
    myClone.responsable = filiere.responsable;
    return myClone;
  }

  public save() {
    this.http.post<number>(this._urlDepartement, this.departement).subscribe(
      data => {
        if (data > 0) {
          this.departements.push(this.cloneDepartement(this.departement));
          this.departement = null ;
          this.filiere = null;
          console.log('save() marche >0');
          this._departementExists = false;
        } else if (data === -1) {
          console.log('save() marche <0');
          this._departementExists = true;
        }
      }, eror => {
        console.log('ERROR save()');
      }
    );
  }

  private cloneDepartement(departement: Departement) {
    const myClone = new Departement();
    myClone.nom = departement.nom;
    myClone.description = departement.description;
    myClone.reference = departement.reference;
    myClone.chef = departement.chef;
    return myClone;
  }

  public validateSave(): boolean {
    return this.departement.reference != null && this.departement.filieres.length > 0;
  }

  public deleteByReferenceFromView(dep: Departement) {
    const index = this.departements.findIndex(d => d.reference === dep.reference );
    if (index !== -1) {
      this.departements.splice(index, 1);
    }
  }

  public  deleteByReference(dep: Departement) {
    this.http.delete<number>(this._urlDepartement + 'reference/' + dep.reference).subscribe(
      data => {
        console.log('DATA ' + data);
        this.deleteByReferenceFromView(dep);
      }
    );
  }

  public findFiliereByDepartementReference(dep: Departement) {
    this.departementSelected = dep;
    if (this.departementSelected != null) {
      this.http.get<Array<Filiere>>(this._urlFiliere + 'departement/reference/' + this.departementSelected.reference).subscribe(
        data => {
          this._departementSelected.filieress = data;
          this.dtTrigger2.next();
          this.ngOnDestroy2();
        }
      );
    }
  }

  public findAll() {
    this.http.get<Array<Departement>>(this._urlDepartement).subscribe(
      data => {
        console.log('DATA ' + data);
        this.departements = data;
        this.dtTrigger.next();
        this.ngOnDestroy();
      }
    );
  }

  public recover(departement: Departement, id: number) {
    console.log('c est bon');
    this.departement2.id = departement.id;
    this.departement2.nom = departement.nom;
    this.departement2.reference = departement.reference;
    this.departement2.description = departement.description;
    this.departement2.chef = departement.chef;
  }

  public update(id: number, nom: string, reference: string, description: string, chef: string) {
    this.http.put(this._urlDepartement + 'id/' + id + '/nom/'  +  nom + '/reference/' + reference + '/description/' + description +
      '/chef/' + chef, this.departement).subscribe(
      data => {
        if (data > 0) {
          console.log('update() marche');
        }
      });
  }

  public recoverFiliere(filiere: Filiere, id: number) {
    console.log('recover() marche');
    this.filiere2.id = filiere.id;
    this.filiere2.libelle = filiere.libelle;
    this.filiere2.description = filiere.description;
    this.filiere2.responsable = filiere.responsable;
  }

  public updateFiliere(id: number, libelle: string, description: string, responsable: string) {
    this.http.put(this._urlFiliere + 'id/' + id + '/libelle/'  +  libelle + '/description/' + description + /responsable/ + responsable, this.filiere).subscribe(
      data => {
        if (data > 0) {
          console.log('update() marche');
        }
      });
  }

  public deleteFiliereById(fil: Filiere) {
    this.http.delete<number>(this._urlFiliere + 'id/' + fil.id).subscribe(
      data => {
        console.log('DATA ' + data);
        this.deleteFiliereByIdFromView(fil);
      }
    );
  }

  public deleteFiliereByIdFromView(fil: Filiere) {
    const index = this.filieres.findIndex(f => f.id === fil.id );
    if (index !== -1) {
      this.filieres.splice(index, 1);
    }
  }

  get departement(): Departement {
    if (this._departement == null) {
      this._departement = new Departement();
    }
    return this._departement;
  }

  set departement(value: Departement) {
    this._departement = value;
  }

   get departement2(): Departement {
      if (this._departement2 == null) {
        this._departement2 = new Departement();
      }
      return this._departement2;
    }

  set departement2(value: Departement) {
    this._departement2 = value;
  }

  get filiere(): Filiere {
    if (this._filiere == null) {
      this._filiere = new Filiere();
    }
    return this._filiere;
  }

  set filiere(value: Filiere) {
    this._filiere = value;
  }

  get filiere2(): Filiere {
    if (this._filiere2 == null) {
      this._filiere2 = new Filiere();
    }
    return this._filiere2;
  }

  set filiere2(value: Filiere) {
    this._filiere2 = value;
  }

  get filieres(): Array<Filiere> {
    return this._filieres;
  }

  set filieres(value: Array<Filiere>) {
    this._filieres = value;
  }

  get departements(): Array<Departement> {
    if (this._departements == null) {
      this._departements = new Array<Departement>();
    }
    return this._departements;
  }

  set departements(value: Array<Departement>) {
    this._departements = value;
  }

  get departementSelected(): Departement {
    return this._departementSelected;
  }

  set departementSelected(value: Departement) {
    this._departementSelected = value;
  }

  get departementExists(): boolean {
    return this._departementExists;
  }

  set departementExists(value: boolean) {
    this._departementExists = value;
  }
}
