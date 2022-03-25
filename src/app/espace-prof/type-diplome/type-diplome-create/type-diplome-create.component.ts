import { Component, OnInit } from '@angular/core';
import {Departement} from '../../../controller/model/departement.model';
import {TypeDiplomeService} from '../../../controller/service/type-diplome.service';
import {TypeDiplome} from '../../../controller/model/type-diplome.model';
import {UserService} from '../../../controller/service/user.service';

@Component({
  selector: 'app-type-diplome-create',
  templateUrl: './type-diplome-create.component.html',
  styleUrls: ['./type-diplome-create.component.css']
})
export class TypeDiplomeCreateComponent implements OnInit {

  showModalSaveTypeDiplomeConfirmation = false;
  showModalAddTypeDiplome = false;

  constructor(private typeDiplomeService: TypeDiplomeService, private userService: UserService) { }

  ngOnInit(): void {
    //this.userService.userIsLogged = true;

  }
  get typeDiplome(): TypeDiplome {
    return  this.typeDiplomeService.typeDiplome;
  }
  get typeDiplomeExists(): boolean {
    return  this.typeDiplomeService.typeDiplomeExists;
  }
  public save() {
    this.typeDiplomeService.save();
  }
  public validateSave() {
    return this.typeDiplomeService.validateSave();
  }

}
