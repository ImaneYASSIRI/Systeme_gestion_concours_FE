import {Filiere} from './filiere.model';

export class Departement {
  public id: number;
  public nom: string;
  public reference: string;
  public description: string;
  public chef: string;
  public filieres = new Array<Filiere>();
  public filieress = new Array<Filiere>();
}
