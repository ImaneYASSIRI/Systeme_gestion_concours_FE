import {Inscription} from './inscription.model';
import {ConfigConcours} from './config-concours.model';

export class Concours {
  public id: number;
  public reference: string;
  public description: string;
  public annee: number;
  public nbreEtudiantAdmisOrale: number;
  public nbreEtudiantAdmisEcrit: number;
  public nbreEtudiantAdmis: number;
  public dateOrale = new Date();
  public dateEcrit = new Date();
  public dateAffichageResultatFinal = new Date();
  public inscriptions = new Array<Inscription>();
  public configConcourss = new Array<ConfigConcours>();
  public configConcoursss = new Array<ConfigConcours>();
}
