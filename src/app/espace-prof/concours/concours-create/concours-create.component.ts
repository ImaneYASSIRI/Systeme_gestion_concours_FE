import { Component, OnInit } from '@angular/core';
import {Concours} from '../../../controller/model/concours.model';
import {ConcoursService} from '../../../controller/service/concours.service';
import {ConfigConcours} from '../../../controller/model/config-concours.model';
import {TypeDiplome} from '../../../controller/model/type-diplome.model';
import {UserService} from '../../../controller/service/user.service';

@Component({
  selector: 'app-concours-create',
  templateUrl: './concours-create.component.html',
  styleUrls: ['./concours-create.component.css']
})
export class ConcoursCreateComponent implements OnInit {

  showModalSaveConcoursConfirmation = false;
  showModalAddConfigConcoursConfirmation = false;
  showModalAddConcours = false;

  constructor(private concoursService: ConcoursService, private userService: UserService) { }

  ngOnInit(): void {
    //this.userService.userIsLogged = true;
    this.concoursService.getTypeDiplomes();
  }

  get concours(): Concours {
    return  this.concoursService.concours;
  }
  get configConcours(): ConfigConcours {
    return  this.concoursService.configConcours;
  }
  get concoursExists(): boolean {
    return  this.concoursService.concoursExists;
  }
  get typeDiplomes(): Array<TypeDiplome> {
    return this.concoursService.typeDiplomes;
  }
  public addConfigConcours() {
    this.concoursService.addConfigConcours();
  }
  public save() {
    this.concoursService.save();
  }
  public validateSave() {
    return this.concoursService.validateSave();
  }
}
