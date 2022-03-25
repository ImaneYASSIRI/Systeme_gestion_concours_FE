import { Component, OnInit } from '@angular/core';
import {Concours} from '../../../controller/model/concours.model';
import {DepartementService} from '../../../controller/service/departement.service';
import {Departement} from '../../../controller/model/departement.model';
import {Filiere} from '../../../controller/model/filiere.model';
import {TypeDiplome} from '../../../controller/model/type-diplome.model';
import {UserService} from '../../../controller/service/user.service';

@Component({
  selector: 'app-departement-create',
  templateUrl: './departement-create.component.html',
  styleUrls: ['./departement-create.component.css']
})
export class DepartementCreateComponent implements OnInit {

  showModalSaveDepartementConfirmation = false;
  showModalAddFiliereConfirmation = false;
  showModalAddDepartement = false;

  constructor(private departementService: DepartementService, private userService: UserService) { }

  ngOnInit(): void {
    //this.userService.userIsLogged = true;
  }

  get departement(): Departement {
    return  this.departementService.departement;
  }
  get filiere(): Filiere {
    return  this.departementService.filiere;
  }
  get departementExists(): boolean {
    return  this.departementService.departementExists;
  }
  public addFiliere() {
    this.departementService.addFiliere();
  }
  public save() {
    this.departementService.save();
  }
  public validateSave() {
    return this.departementService.validateSave();
  }
}
