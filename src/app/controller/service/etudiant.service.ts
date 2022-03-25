import { Injectable } from '@angular/core';
import {User} from '../model/user.model';
import {Etudiant} from '../model/etudiant.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private _etudiant: Etudiant;
  private _etudiant2: Etudiant;
  private _etudiants: Array <Etudiant>;

  private _urlEtudiant = 'http://localhost:8090/pfe-concours-v3-api/etudiant/' ;

  private _noAccount = false;
  private _bloqued = false;
  private _incorrectPwd = false;
  private _etudiantExists = false;
  private _registration = false;
  private _isLogged = false;

  dtTrigger: Subject<any> = new Subject();

  constructor(private http: HttpClient, private router: Router) { }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private extractData(res: Response) {
    const body = res.json();
    /* return body.data || {};*/
  }

  public seConnecter() {
    console.log(this.etudiant2);
    this.http.put<number>(this._urlEtudiant + 'seconnecter', this.etudiant2).subscribe(
      data => {
        if (data > 0) {
          this._incorrectPwd = false;
          this._noAccount = false;
          localStorage.setItem('etudiant', this.etudiant2.cne);
          this.router.navigate(['espace-etudiant/preinscription']);
          this.etudiant2.cne = null;
          this.etudiant2.password = null;
          this._isLogged = true;
          console.log('seConnecter() marche >0');
        } else if (data === -1) {
          //alert('Vous n avez pas de compte');
          this._noAccount = true;
          this._incorrectPwd = false;
          /*} else if (data === -2) {
            alert('Vous êtes bloqué');*/
        } else {
          //alert('CNE ou mot de passe incorrect');
          console.log('seConnecter() marche <0');
          this._incorrectPwd = true;
          this._noAccount = false;
        }
      }, error => {
        console.log('ERROR seConnecter()');
      }
    );
  }

  public registrer() {
    console.log(this.etudiant2);
    this.http.post<number>(this._urlEtudiant + 'registrer', this.etudiant2).subscribe(
      data => {
        if (data > 0) {
          this._etudiantExists = false;
          this._registration = true;
          this.etudiant2.nom = null;
          this.etudiant2.prenom = null;
          this.etudiant2.email = null;
          console.log('registrer() marche >0');
          this.router.navigate(['/login']);
        } else {
          //alert('Vous êtes déjà inscrit')
          this._etudiantExists = true;
          this._registration = false;
          console.log('registrer() marche <0');
        }
      }, error => {
        console.log('ERROR registrer()');
      }
    );
  }

  public findAll() {
    this.http.get<Array<Etudiant>>(this._urlEtudiant).subscribe(
      data => {
        console.log('DATA :' + data)
        this.etudiants = data;
        this.dtTrigger.next();
        this.ngOnDestroy();
      }
    );
  }

  public logOut() {
    this._isLogged = false;
    this._registration = false;
    localStorage.removeItem('etudiant');
    this.router.navigate(['/login']);
    //this.router.navigateByUrl('/login');
  }

  public recover(e: Etudiant, id: number) {
    console.log('recover() marche');
    this.etudiant.id = e.id;
    this.etudiant.cne = e.cne;
    this.etudiant.nom = e.nom;
    this.etudiant.prenom = e.prenom;
    this.etudiant.password = e.password;
    this.etudiant.email = e.email;
  }

  public update(id: number, cne: string, nom: string, prenom: string, email: string) {
    this.http.put(this._urlEtudiant + 'id/' + id + '/cne/'  +  cne + '/nom/' + nom + '/prenom/'  +  prenom + '/email/' + email
      , this.etudiant).subscribe(
      data => {
        if (data > 0) {
          console.log('update() marche');
        }
      });
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

  get etudiants(): Array<Etudiant> {
    if (this._etudiants == null) {
      this._etudiants = new Array <Etudiant>();
    }
    return this._etudiants;
  }

  set etudiants(value: Array<Etudiant>) {
    this._etudiants = value;
  }


  get noAccount(): boolean {
    return this._noAccount;
  }

  set noAccount(value: boolean) {
    this._noAccount = value;
  }

  get incorrectPwd(): boolean {
    return this._incorrectPwd;
  }

  set incorrectPwd(value: boolean) {
    this._incorrectPwd = value;
  }

  get isLogged(): boolean {
    return this._isLogged;
  }

  set isLogged(value: boolean) {
    this._isLogged = value;
  }

  get etudiantExists(): boolean {
    return this._etudiantExists;
  }

  set etudiantExists(value: boolean) {
    this._etudiantExists = value;
  }

  get registration(): boolean {
    return this._registration;
  }

  set registration(value: boolean) {
    this._registration = value;
  }

}
