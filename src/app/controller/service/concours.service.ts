import { Injectable } from '@angular/core';
import {Concours} from '../model/concours.model';
import {ConfigConcours} from '../model/config-concours.model';
import {TypeDiplome} from '../model/type-diplome.model';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConcoursService {

  private _concours: Concours ;
  private _concours2: Concours ;
  private _configConcours: ConfigConcours ;
  private _configConcours2: ConfigConcours ;
  private _typeDiplomes: Array<TypeDiplome>;
  private _concourss: Array<Concours>;
  private _configConcourss: Array<ConfigConcours>;
  private _concoursSelected: Concours;

  private _concoursExists = false;

  private _urlConcours = 'http://localhost:8090/pfe-concours-v3-api/concours/';
  private _urlTypeDiplome = 'http://localhost:8090/pfe-concours-v3-api/type-diplome/' ;
  private _urlConfigConcours = 'http://localhost:8090/pfe-concours-v3-api/config-concours/' ;

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

  private extractData(res: Response) {
    const body = res.json();
    /* return body.data || {};*/
  }

  public addConfigConcours() {
    this.concours.configConcourss.push(this.cloneConfigConcours(this.configConcours)) ;
    this.configConcours = null;
  }

  private cloneConfigConcours(configConcours: ConfigConcours) {
    const myClone = new ConfigConcours() ;
    myClone.typeDiplome = configConcours.typeDiplome ;
    myClone.noteMin = configConcours.noteMin ;
    myClone.nbreMaxAdmis = configConcours.nbreMaxAdmis ;
    myClone.nbreMaxEcritAdmis = configConcours.nbreMaxEcritAdmis ;
    myClone.nbreMaxOraleAdmis = configConcours.nbreMaxOraleAdmis ;
    myClone.anneeBacMax = configConcours.anneeBacMax ;
    return myClone;
  }

  public save() {
    this.http.post<number>(this._urlConcours, this.concours).subscribe(
      data => {
        if (data > 0) {
          this.concourss.push(this.cloneConcours(this.concours));
          this.concours = null;
          this.configConcours = null;
          console.log('save() marche >0');
          this._concoursExists = false;
        } else if (data === -1) {
          console.log('save() marche <0');
          this._concoursExists = true;
        }
      }, error => {
        console.log('ERROR save()');
      }
    );
  }

  public validateSave(): boolean {
    return this.concours.reference != null && this.concours.configConcourss.length > 0 ;
  }

  private cloneConcours(concours: Concours) {
    const myClone = new Concours() ;
    myClone.reference = concours.reference ;
    myClone.annee = concours.annee ;
    myClone.description = concours.description ;
    return myClone;
  }

  public getTypeDiplomes() {
    this.http.get<Array<TypeDiplome>>(this._urlTypeDiplome).subscribe(
      data => {
        this._typeDiplomes = data ;
      }
    );
  }

  public deleteByReferenceFromView(concours: Concours) {
    const index = this.concourss.findIndex(c => c.reference === concours.reference);
    if (index !== -1) {
      this.concourss.splice(index, 1);

    }
  }

  public deleteByReference(concours: Concours) {
    this.http.delete<number>(this._urlConcours + 'reference/' + concours.reference).subscribe(
      data => {
        console.log('DATA: ' + data);
        this.deleteByReferenceFromView(concours);
      }
    );
  }

  public findConfigConcoursByConcoursReference(concour: Concours) {
    this.concoursSelected = concour;
    if (this.concoursSelected != null) {
      this.http.get<Array<ConfigConcours>>(this._urlConfigConcours + 'concours/reference/' + this.concoursSelected.reference).subscribe(
        data => {
          this._concoursSelected.configConcoursss = data;
          this.dtTrigger2.next();
          this.ngOnDestroy2();
        }
      );
    }
  }

  public findAll() {
    this.http.get<Array<Concours>>(this._urlConcours).subscribe(
      data => {
        console.log('DATA: ' + data);
        this.concourss = data;
        this.dtTrigger.next();
        this.ngOnDestroy();
      }
    );
  }

  public recover(concours: Concours, id: number) {
    console.log('recover() marche');
    this.concours2.id = concours.id;
    this.concours2.reference = concours.reference;
    this.concours2.annee = concours.annee;
    this.concours2.description = concours.description;
    this.concours2.dateOrale = concours.dateOrale;
    this.concours2.dateEcrit = concours.dateEcrit;
    this.concours2.dateAffichageResultatFinal = concours.dateAffichageResultatFinal;
    this.concours2.nbreEtudiantAdmis = concours.nbreEtudiantAdmis;
    this.concours2.nbreEtudiantAdmisOrale = concours.nbreEtudiantAdmisOrale;
    this.concours2.nbreEtudiantAdmisEcrit = concours.nbreEtudiantAdmisEcrit;
  }

  public update(id: number, reference: string, annee: number, dateOrale: Date, dateEcrit: Date, nbreEtudiantAdmisOrale: number,
                nbreEtudiantAdmisEcrit: number, nbreEtudiantAdmis: number, description: string) {
    this.http.put(this._urlConcours + 'id/' + id + '/reference/'  +  reference + '/annee/' + annee + '/dateOrale/' +
      dateOrale + '/dateEcrit/'  +  dateEcrit + '/nbreEtudiantAdmisOrale/' + nbreEtudiantAdmisOrale + '/nbreEtudiantAdmisEcrit/' +
      nbreEtudiantAdmisEcrit + '/nbreEtudiantAdmis/' + nbreEtudiantAdmis + '/description/' + description, this.concours).subscribe(
      data => {
        if (data > 0) {
          console.log('update() marche');
        }
      });
  }

  public deleteConfigConcoursById(conf: ConfigConcours) {
    this.http.delete<number>(this._urlConfigConcours + 'id/' + conf.id).subscribe(
      data => {
        console.log('DATA' + data);
        this.deleteConfigConcoursByIdFromView(conf);
      }
    );
  }

  public deleteConfigConcoursByIdFromView(conf: ConfigConcours) {
    const index = this.configConcourss.findIndex(c => c.id === conf.id );
    if (index !== -1) {
      this.configConcourss.splice(index, 1);
    }
  }

  public recoverConfigConcours(conf: ConfigConcours, id: number) {
    console.log('recover() marche');
    this.configConcours2.id = conf.id;
    /*this.configConcours2.typeDiplome = conf.typeDiplome;*/
    this.configConcours2.nbreMaxEcritAdmis = conf.nbreMaxEcritAdmis;
    this.configConcours2.noteMin = conf.noteMin;
    this.configConcours2.nbreMaxOraleAdmis = conf.nbreMaxOraleAdmis;
    this.configConcours2.nbreMaxAdmis = conf.nbreMaxAdmis;
  }

  public updateConfigConcours(id: number , noteMin: number, nbreMaxAdmis: number, nbreMaxEcritAdmis: number, nbreMaxOraleAdmis: number) {
    this.http.put(this._urlConfigConcours + 'id/' + id + '/noteMin/'  +  noteMin + '/nbreMaxAdmis/' + nbreMaxAdmis + '/nbreMaxEcritAdmis/'
      + nbreMaxEcritAdmis + '/nbreMaxOraleAdmis/' + nbreMaxOraleAdmis, this.configConcours).subscribe(
      data => {
        if (data > 0) {
          console.log('update() marche');
        }
      });
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

  get concours2(): Concours {
    if (this._concours2 == null) {
      this._concours2 = new Concours();
    }
    return this._concours2;
  }

  set concours2(value: Concours) {
    this._concours2 = value;
  }

  get configConcours(): ConfigConcours {
    if (this._configConcours == null) {
      this._configConcours = new ConfigConcours() ;
    }
    return this._configConcours;
  }

  set configConcours(value: ConfigConcours) {
    this._configConcours = value;
  }

  get configConcours2(): ConfigConcours {
    if (this._configConcours2 == null) {
      this._configConcours2 = new ConfigConcours() ;
    }
    return this._configConcours2;
  }

  set configConcours2(value: ConfigConcours) {
    this._configConcours2 = value;
  }

  get typeDiplomes(): Array<TypeDiplome> {
    return this._typeDiplomes;
  }

  set typeDiplomes(value: Array<TypeDiplome>) {
    this._typeDiplomes = value;
  }

  get concourss(): Array<Concours> {
    if (this._concourss == null) {
      this._concourss = new Array<Concours>();
    }
    return this._concourss;
  }

  set concourss(value: Array<Concours>) {
    this._concourss = value;
  }

  get configConcourss(): Array<ConfigConcours> {
    if (this._configConcourss == null) {
      this._configConcourss = new Array<ConfigConcours>() ;
    }
    return this._configConcourss;
  }

  set configConcourss(value: Array<ConfigConcours>) {
    this._configConcourss = value;
  }

  get concoursSelected(): Concours {
    return this._concoursSelected;
  }

  set concoursSelected(value: Concours) {
    this._concoursSelected = value;
  }

  get concoursExists(): boolean {
    return this._concoursExists;
  }

  set concoursExists(value: boolean) {
    this._concoursExists = value;
  }
}
