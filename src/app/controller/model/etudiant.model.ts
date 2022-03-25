import {TypeDiplome} from './type-diplome.model';
import {Inscription} from './inscription.model';

export class Etudiant {
  public id: number;
  public cne: string;
  public cin: string;
  public nom: string;
  public prenom: string;
  public telephone: string;
  public email: string;
  public dateNaissance = new Date();
  public noteS1: number;
  public noteS2: number;
  public noteS3: number;
  public moyenne: number;
  public noteS4: number;
  public moyenneBac: number;
  public inscriptions = new Array<Inscription>();
  public typeDiplome = new TypeDiplome();
  public imageBac: File;
  public imageS1: File;
  public imageS2: File;
  public imageS3: File;
  public imageS4: File;
  public anneeBac: number;
  public password: string;

}
