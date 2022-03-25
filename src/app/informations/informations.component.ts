import { Component, OnInit } from '@angular/core';
import {DepartementService} from '../controller/service/departement.service';
import {Departement} from '../controller/model/departement.model';
import {Filiere} from '../controller/model/filiere.model';
import {Subject} from 'rxjs';
import {ConcoursService} from '../controller/service/concours.service';
import {Concours} from '../controller/model/concours.model';
import {TypeDiplome} from '../controller/model/type-diplome.model';
import {ConfigConcours} from '../controller/model/config-concours.model';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.css']
})
export class InformationsComponent implements OnInit {

  constructor(private departementService: DepartementService, private concoursService: ConcoursService) { }

  ngOnInit(): void {
    this.departementService.findAll();
    this.concoursService.findAll();
  }

  get departements(): Array<Departement> {
    return this.departementService.departements;
  }
  get departementSelected(): Departement {
    return this.departementService.departementSelected;
  }
  get departement(): Departement {
    return this.departementService.departement;
  }
  get concourss(): Array<Concours> {
    return this.concoursService.concourss;
  }
  get concours(): Concours {
    return  this.concoursService.concours;
  }
  get concoursSelected(): Concours {
    return this.concoursService.concoursSelected;
  }
  get typeDiplomes(): Array<TypeDiplome> {
    return this.concoursService.typeDiplomes;
  }
  public findConfigConcoursByConcoursReference(concours: Concours) {
    this.concoursService.findConfigConcoursByConcoursReference(concours);
  }
  public findFiliereByDepartementReference(dep: Departement) {
    this.departementService.findFiliereByDepartementReference(dep);
  }
}
