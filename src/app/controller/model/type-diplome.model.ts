import {ConfigConcours} from './config-concours.model';
import {Etudiant} from './etudiant.model';

export class TypeDiplome {
  public id: number;
  public libelle: string;
  public description: string;
  public configConcourss = new Array<ConfigConcours>();
  public configConcourss2 = new Array<ConfigConcours>();
  public etudiants = new Array<Etudiant>();

}
