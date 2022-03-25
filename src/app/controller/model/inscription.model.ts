import {Etudiant} from './etudiant.model';
import {Concours} from './concours.model';

export class Inscription {
  public reference: string;
  public dateInscription = new Date();
  public concours = new Concours();
  public etudiant = new Etudiant();
}
