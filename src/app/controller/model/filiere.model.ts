import {Concours} from './concours.model';
import {Departement} from './departement.model';

export class Filiere {
  public id: number;
  public libelle: string;
  public description: string;
  public responsable: string;
  public departement = new Departement();
}
