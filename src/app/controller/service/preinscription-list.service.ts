import { Injectable } from '@angular/core';
import {Concours} from '../model/concours.model';
import {Inscription} from '../model/inscription.model';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Etudiant} from '../model/etudiant.model';
import {ConfigConcours} from '../model/config-concours.model';
import {TypeDiplome} from '../model/type-diplome.model';

@Injectable({
  providedIn: 'root'
})
export class PreinscriptionListService {

  private _concourss: Array <Concours>;
  private _typeDiplomes: Array <TypeDiplome>;
  private _etudiants: Array <Etudiant>;
  private _configConcourss: Array <ConfigConcours>;
  private _concours: Concours;
  private _concoursSelected: Concours;
  private _typeDiplome: TypeDiplome;
  private _typeDiplomeSelected: TypeDiplome;

  private _urlEtudiant = 'http://localhost:8090/pfe-concours-v3-api/etudiant/';
  private _urlConcours = 'http://localhost:8090/pfe-concours-v3-api/concours/';
  private _urlConfigConcours = 'http://localhost:8090/pfe-concours-v3-api/config-concours/';
  private _urlInscription = 'http://localhost:8090/pfe-concours-v3-api/inscription/';
  private _urlTypeDiplome = 'http://localhost:8090/pfe-concours-v3-api/type-diplome/';


  dtTrigger: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();
  dtTrigger3: Subject<any> = new Subject();

  constructor(private http: HttpClient) { }

  public findEtudiantsByConcoursReference(concourDescription: string) {
      console.log(this._urlInscription + 'concours/description/' + concourDescription);
      this.http.get<Array<Inscription>>(this._urlInscription + 'concours/description/' + concourDescription).subscribe(
        data => {
          this.concoursSelected.inscriptions = data;
          this.dtTrigger.next();
          this.ngOnDestroy();
        }
      );
  }

  public findEtudiantsByTypeDiplomeLibelle(typeDiplomeLibelle: string) {
    console.log(this._urlTypeDiplome + 'type-diplome/libelle/' + typeDiplomeLibelle);
    this.http.get<Array<Etudiant>>(this._urlEtudiant + 'type-diplome/libelle/' + typeDiplomeLibelle).subscribe(
      data => {
        this.typeDiplomeSelected.etudiants = data;
        this.dtTrigger2.next();
        this.ngOnDestroy2();
      }
    );
  }

  public findByMoyenne(seuil: number) {
      this.http.get<Array<Etudiant>>(this._urlEtudiant + 'seuil/' + seuil).subscribe(
        data => {
          this.etudiants = data;
          this.dtTrigger3.next();
          this.ngOnDestroy3();
        }
      );
  }

  public findConcoursByConfigConcourssNoteMin(seuil: number) {
      this.http.get<Concours>(this._urlConcours + 'seuil/' + seuil).subscribe(
        data => {
          this.concours = data;
        }
      );
  }

  public getConcourss() {
    this.http.get<Array<Concours>>(this._urlConcours).subscribe(
      data => {
        this._concourss = data;
      }
    );
  }

  public getTypeDiplomes() {
    this.http.get<Array<TypeDiplome>>(this._urlTypeDiplome).subscribe(
      data => {
        this._typeDiplomes = data;
      }
    );
  }

  public getConfigConcourss() {
    this.http.get<Array<ConfigConcours>>(this._urlConfigConcours).subscribe(
      data => {
        this._configConcourss = data;
      }
    );
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngOnDestroy2(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger2.unsubscribe();
  }

  ngOnDestroy3(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger3.unsubscribe();
  }

  private extractData(res: Response) {
    const body = res.json();
   /* return body.data || {};*/
  }

  public findAll() {
    this.http.get<Array<Concours>>(this._urlConcours).subscribe(
      data => {
        console.log('data :' + data)
        this.concourss = data;
      }
    );
  }

  get concourss(): Array<Concours> {
    if (this._concourss == null) {
      this._concourss = new Array <Concours>();
    }
    return this._concourss;
  }

  set concourss(value: Array<Concours>) {
    this._concourss = value;
  }

  get typeDiplomes(): Array<TypeDiplome> {
    if (this._typeDiplomes == null) {
      this._typeDiplomes = new Array <TypeDiplome>();
    }
    return this._typeDiplomes;
  }

  set typeDiplomes(value: Array<TypeDiplome>) {
    this._typeDiplomes = value;
  }

  get configConcourss(): Array<ConfigConcours> {
    if (this._configConcourss == null) {
      this._configConcourss = new Array <ConfigConcours>();
    }
    return this._configConcourss;
  }

  set configConcourss(value: Array<ConfigConcours>) {
    this._configConcourss = value;
  }

  get etudiants(): Array<Etudiant> {
    if (this._etudiants == null) {
      this._etudiants = new Array <Etudiant>();
    }
    return this._etudiants;
  }

  set etudiants(value: Array<Etudiant>) {
    this._etudiants = value;
  }

  get concoursSelected(): Concours {
    if(this._concoursSelected == null) {
      this._concoursSelected = new Concours();
    }
    return this._concoursSelected;
  }

  set concoursSelected(value: Concours) {
    this._concoursSelected = value;
  }

  get concours(): Concours {
    return this._concours;
  }

  set concours(value: Concours) {
    this._concours = value;
  }

  get typeDiplomeSelected(): TypeDiplome {
    if(this._typeDiplomeSelected == null) {
      this._typeDiplomeSelected = new TypeDiplome();
    }
    return this._typeDiplomeSelected;
  }

  set typeDiplomeSelected(value: TypeDiplome) {
    this._typeDiplomeSelected = value;
  }

  get typeDiplome(): TypeDiplome {
    return this._typeDiplome;
  }

  set typeDiplome(value: TypeDiplome) {
    this._typeDiplome = value;
  }
}
