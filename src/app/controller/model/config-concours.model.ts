import {TypeDiplome} from './type-diplome.model';
import {Concours} from './concours.model';

export class ConfigConcours {
  public typeDiplome = new TypeDiplome();
  public noteMin: number;
  public id: number;
  public nbreMaxAdmis: number;
  public nbreMaxEcritAdmis: number;
  public nbreMaxOraleAdmis: number;
  public concours = new Concours();
  public anneeBacMax: number;
  public anneeBacMin: number;
}
