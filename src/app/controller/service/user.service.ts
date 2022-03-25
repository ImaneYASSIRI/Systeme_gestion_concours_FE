import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user.model';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User;

  private _urlUser = 'http://localhost:8090/pfe-concours-v3-api/user/' ;

  private _incorrectPwd = false;
  private _userIsLogged = false;


  dtTrigger: Subject<any> = new Subject();

  constructor(private http: HttpClient, private router: Router) { }

  public seConnecter() {
    console.log(this.user);
    this.http.put<number>(this._urlUser + 'seconnecter', this.user).subscribe(
      data => {
        if (data > 0) {
          localStorage.setItem('user', this.user.login);
          this._userIsLogged = true;
          this._incorrectPwd = false;
          this.router.navigate(['espace-prof/commission']);
          this.user.login = null;
          this.user.password = null;
          console.log('seConnecter() marche >0');
        } else {
          //alert('CNE ou mot de passe incorrect');
          console.log('seConnecter() marche <0');
          this._incorrectPwd = true;
        }
      }, error => {
        console.log('ERROR seConnecter()');
      }
    );
  }

  public userLogOut() {
    this._userIsLogged = false;
    localStorage.removeItem('user');
    this.router.navigate(['/login-user']);
    //this.router.navigateByUrl('/login');
  }

  get user(): User {
    if (this._user == null){
      this._user = new User();
    }
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get incorrectPwd(): boolean {
    return this._incorrectPwd;
  }

  set incorrectPwd(value: boolean) {
    this._incorrectPwd = value;
  }

  get userIsLogged(): boolean {
    return this._userIsLogged;
  }

  set userIsLogged(value: boolean) {
    this._userIsLogged = value;
  }
}
