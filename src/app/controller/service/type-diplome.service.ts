import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TypeDiplome} from '../model/type-diplome.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeDiplomeService {

  private _typeDiplome: TypeDiplome;
  private _typeDiplome2: TypeDiplome;
  private _typeDiplomes: Array<TypeDiplome> ;

  private _typeDiplomeExists: boolean;

  private _urlTypeDiplome = 'http://localhost:8090/pfe-concours-v3-api/type-diplome/' ;

  dtTrigger: Subject<any> = new Subject();

  constructor(private http: HttpClient) { }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  public save() {
    this.http.post<number>(this._urlTypeDiplome, this.typeDiplome).subscribe(
      data => {
        if (data > 0) {
          this._typeDiplomes.push(this.cloneTypeDiplome(this.typeDiplome));
          this.typeDiplome = null ;
          console.log('save() marche >0');
          this._typeDiplomeExists = false;
        } else if (data === -1) {
          console.log('save() marche <0');
          this._typeDiplomeExists = true;
        }
      }, error => {
        console.log('ERROR save()');
      }
    );
  }

  private cloneTypeDiplome(typeDiplome: TypeDiplome) {
    const myClone = new TypeDiplome();
    myClone.libelle = typeDiplome.libelle;
    myClone.description = typeDiplome.description;
    return myClone;
  }

  public validateSave(): boolean {
    return this.typeDiplome.libelle != null && this.typeDiplome.description != null ;
  }

  public  deleteByLibelle(td: TypeDiplome) {
    this.http.delete<number>(this._urlTypeDiplome + 'libelle/' + td.libelle).subscribe(
      data => {
        console.log('DATA ' + data);
        this.deleteByLibelleFromView(td);
      }
    );
  }

  public deleteByLibelleFromView(td: TypeDiplome) {
    const index = this.typeDiplomes.findIndex(t => t.libelle === td.libelle );
    if (index !== -1) {
      this.typeDiplomes.splice(index, 1);
    }
  }

  public findAll() {
    this.http.get<Array<TypeDiplome>>(this._urlTypeDiplome).subscribe(
      data => {
        console.log('DATA ' + data);
        this.typeDiplomes = data;
        this.dtTrigger.next();
        this.ngOnDestroy();
      }
    );
  }

  public recover(typeDiplome: TypeDiplome, id: number) {
    console.log('recover() marche');
    this.typeDiplome2.id = typeDiplome.id;
    this.typeDiplome2.libelle = typeDiplome.libelle;
    this.typeDiplome2.description = typeDiplome.description;
  }

  public update(id: number, libelle: string, description: string) {
    this.http.put(this._urlTypeDiplome + 'id/' + id + '/libelle/'  +  libelle + '/description/' + description, this.typeDiplome).subscribe(
      data => {
        if (data > 0) {
          console.log('update() marche');
        }
      });
  }

  get typeDiplomes(): Array<TypeDiplome> {
    if (this._typeDiplomes == null) {
      this._typeDiplomes = new Array<TypeDiplome>();
    }
    return this._typeDiplomes;
  }

  set typeDiplomes(value: Array<TypeDiplome>) {
    this._typeDiplomes = value;
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

  get typeDiplome2(): TypeDiplome {
    if (this._typeDiplome2 == null) {
      this._typeDiplome2 = new TypeDiplome();
    }
    return this._typeDiplome2;
  }

  set typeDiplome2(value: TypeDiplome) {
    this._typeDiplome2 = value;
  }

  get typeDiplomeExists(): boolean {
    return this._typeDiplomeExists;
  }

  set typeDiplomeExists(value: boolean) {
    this._typeDiplomeExists = value;
  }
}
