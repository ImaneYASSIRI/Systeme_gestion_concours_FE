import { Injectable } from '@angular/core';
import {Etudiant} from '../model/etudiant.model';
import {Inscription} from '../model/inscription.model';
import {TypeDiplome} from '../model/type-diplome.model';
import {Concours} from '../model/concours.model';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigConcours} from '../model/config-concours.model';

@Injectable({
  providedIn: 'root'
})
export class PreinscriptionService {

  private _concours: Concours ;
  private _inscription: Inscription ;
  private _typeDiplome: TypeDiplome;
  private _etudiant: Etudiant;
  private _etudiant2: Etudiant;
  private _inscriptions: Array<Inscription>;
  private _concourss: Array<Concours>;
  private _etudiants: Array<Etudiant>;
  private _typeDiplomes: Array<TypeDiplome>;
  private _configConcourss: Array<ConfigConcours>;
  private _configConcourss2: Array<ConfigConcours>;
  private _typeDiplomeSelected: TypeDiplome;

  private _urlConfigConcours = 'http://localhost:8090/pfe-concours-v3-api/config-concours/';
  private _urlEtudiant = 'http://localhost:8090/pfe-concours-v3-api/etudiant/';
  private _urlConcours = 'http://localhost:8090/pfe-concours-v3-api/concours/';
  private _urlInscription = 'http://localhost:8090/pfe-concours-v3-api/inscription/' ;
  private _urlTypeDiplome = 'http://localhost:8090/pfe-concours-v3-api/type-diplome/' ;

  constructor(private http: HttpClient ) { }

  public addInscription() {
    console.log(this.inscription);
    this.etudiant.inscriptions.push(this.cloneInscription(this.inscription)) ;
    this.inscription = null;
  }

  private cloneInscription(inscription: Inscription) {
    const myClone = new Inscription() ;
    myClone.concours = inscription.concours ;
    return myClone;
  }

  public validateSave(): boolean {
    return this.etudiant.cne != null && this.etudiant.inscriptions.length > 0 && this.etudiant.typeDiplome != null
      && this.etudiant.cin != null && this.etudiant.nom != null && this.etudiant.prenom != null && this.etudiant.email != null
      && this.etudiant.telephone != null && this.etudiant.noteS1 != null && this.etudiant.noteS2 != null && this.etudiant.noteS3 != null
      && this.etudiant.moyenneBac != null;
  }

  public save() {
    console.log(this._urlEtudiant, this.etudiant);
    this.http.post<number>(this._urlEtudiant, this.etudiant).subscribe(
      data => {
        if (data > 0) {
          this.etudiants.push(this.cloneEtudiant(this.etudiant));
          console.log(this.inscription);
          this.etudiant = null;
          this.inscription = null;
          //alert('succes');
        } else if (data === -1) {
          alert('etudiant déjà existant');
        }
      }, error => {
        console.log('ERROR');
      }
    );
  }

  private cloneEtudiant(etudiant: Etudiant) {
    const myClone = new Etudiant() ;
    myClone.cne = etudiant.cne ;
    myClone.cin = etudiant.cin ;
    myClone.nom = etudiant.nom ;
    myClone.prenom = etudiant.prenom ;
    myClone.telephone = etudiant.telephone ;
    myClone.dateNaissance = etudiant.dateNaissance ;
    myClone.email = etudiant.email ;
    myClone.noteS1 = etudiant.noteS1 ;
    myClone.noteS2 = etudiant.noteS2 ;
    myClone.noteS3 = etudiant.noteS3 ;
    myClone.moyenneBac = etudiant.moyenneBac ;
    myClone.typeDiplome.libelle = etudiant.typeDiplome.libelle ;
    return myClone;
  }

  public findConfigConcoursByTypeDiplomeReference(td: TypeDiplome) {
    this.typeDiplomeSelected = td;
    if (this.typeDiplomeSelected != null){
      this.http.get<Array<ConfigConcours>>(this._urlConfigConcours + 'type-diplome/libelle/' + this.typeDiplomeSelected.libelle).subscribe(
        data => {
          this._typeDiplomeSelected.configConcourss = data;
        }
      );
    }
  }

  public findEtudiantByCne() {
    const cne = localStorage.getItem('etudiant');
    this.http.get<Etudiant>(this._urlEtudiant + 'cne/' + cne).subscribe(
      data => {
        this._etudiant2 = data;
      }, error => {
        console.log('ERROR findEtudiantByCne()');
      }
    );
  }

  public update(id: number, cin: string, cne: string, nom: string, prenom: string, email: string) {
    this.http.put(this._urlEtudiant + 'id/' + id + '/cin/'  +   cin + '/cne/' + cne + '/nom/' + nom + '/prenom/'  +  prenom + '/email/' + email
      , this.etudiant).subscribe(
      data => {
        if (data > 0) {
          console.log('update() marche');
        }
      });
  }

  public updateNew(cne: string, etudiant: Etudiant) {
      console.log(this.etudiant);
      this.http.put(this._urlEtudiant + 'cne/' + cne, this.etudiant).subscribe(
      data => {
        if (data > 0) {
          console.log('update() marche');
          this.inscription = null;
        }
      });
  }

  pushFileToStorageBac(file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', 'http://localhost:8090/pfe-concours-v3-api/file-uploader/savefileBac' + '/cne/' + this.etudiant2.cne, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);
    console.log('error');
  }

  pushFileToStorageS1(file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', 'http://localhost:8090/pfe-concours-v3-api/file-uploader/savefileS1' + '/cne/' + this.etudiant2.cne, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);
    console.log('error');
  }

  pushFileToStorageS2(file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', 'http://localhost:8090/pfe-concours-v3-api/file-uploader/savefileS2' + '/cne/' + this.etudiant2.cne, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);
    console.log('error');
  }

  pushFileToStorageS3(file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', 'http://localhost:8090/pfe-concours-v3-api/file-uploader/savefileS3' + '/cne/' + this.etudiant2.cne, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);
    console.log('error');
  }

  pushFileToStorageS4(file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', 'http://localhost:8090/pfe-concours-v3-api/file-uploader/savefileS4' + '/cne/' + this.etudiant2.cne, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);
    console.log('error');
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

  get concourss(): Array<Concours> {
    return this._concourss;
  }

  set concourss(value: Array<Concours>) {
    this._concourss = value;
  }

  get etudiant(): Etudiant {
    if (this._etudiant == null) {
      this._etudiant = new Etudiant();
    }
    return this._etudiant;
  }

  set etudiant(value: Etudiant) {
    this._etudiant = value;
  }

  get etudiant2(): Etudiant {
    if (this._etudiant2 == null) {
      this._etudiant2 = new Etudiant();
    }
    return this._etudiant2;
  }

  set etudiant2(value: Etudiant) {
    this._etudiant2 = value;
  }

  get concours(): Concours {
    if (this._concours == null) {
      this._concours = new Concours();
    }
    return this._concours;
  }

  set concours(value: Concours) {
    this._concours = value;
  }

  get typeDiplome(): TypeDiplome {
    if (this._typeDiplome == null) {
      this._typeDiplome = new TypeDiplome();
    }
    return this._typeDiplome;
  }

  set typeDiplome(value: TypeDiplome) {
    this._typeDiplome = value;
  }

  get typeDiplomes(): Array<TypeDiplome> {
    return this._typeDiplomes;
  }

  set typeDiplomes(value: Array<TypeDiplome>) {
    this._typeDiplomes = value;
  }


  get configConcourss(): Array<ConfigConcours> {
    return this._configConcourss;
  }

  set configConcourss(value: Array<ConfigConcours>) {
    this._configConcourss = value;
  }

  get configConcourss2(): Array<ConfigConcours> {
    return this._configConcourss2;
  }

  set configConcourss2(value: Array<ConfigConcours>) {
    this._configConcourss2 = value;
  }

  get inscriptions(): Array<Inscription> {
    return this._inscriptions;
  }

  set inscriptions(value: Array<Inscription>) {
    this._inscriptions = value;
  }

  get inscription(): Inscription {
    if (this._inscription == null) {
      this._inscription = new Inscription();
    }
    return this._inscription;
  }

  set inscription(value: Inscription) {
    this._inscription = value;
  }


  get etudiants(): Array<Etudiant> {
    return this._etudiants;
  }

  set etudiants(value: Array<Etudiant>) {
    this._etudiants = value;
  }

  get typeDiplomeSelected(): TypeDiplome {
    return this._typeDiplomeSelected;
  }

  set typeDiplomeSelected(value: TypeDiplome) {
    this._typeDiplomeSelected = value;
  }

}
