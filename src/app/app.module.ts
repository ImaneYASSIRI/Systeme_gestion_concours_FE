// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EspaceEtudiantComponent } from './espace-etudiant/espace-etudiant.component';
import { EspaceProfComponent } from './espace-prof/espace-prof.component';
import { HeaderComponent } from './header/header.component';

import { PreinscriptionComponent } from './espace-etudiant/preinscription/preinscription.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { PreinscriptionListComponent } from './espace-prof/preinscription-list/preinscription-list.component';

import {FileUploadModule} from 'primeng/fileupload';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import { ConcoursComponent } from './espace-prof/concours/concours.component';
import { ConcoursListComponent } from './espace-prof/concours/concours-list/concours-list.component';
import { ConcoursCreateComponent } from './espace-prof/concours/concours-create/concours-create.component';
import { DepartementComponent } from './espace-prof/departement/departement.component';
import { DepartementCreateComponent } from './espace-prof/departement/departement-create/departement-create.component';
import { DepartementListComponent } from './espace-prof/departement/departement-list/departement-list.component';
import { TypeDiplomeComponent } from './espace-prof/type-diplome/type-diplome.component';
import { TypeDiplomeCreateComponent } from './espace-prof/type-diplome/type-diplome-create/type-diplome-create.component';
import { TypeDiplomeListComponent } from './espace-prof/type-diplome/type-diplome-list/type-diplome-list.component';

import { DataTablesModule } from 'angular-datatables';
import { CommissionHomeComponent } from './espace-prof/commission-home/commission-home.component';
import { UsersComponent } from './espace-prof/users/users.component';
import { InformationsComponent } from './informations/informations.component';
import {ConfirmationPopoverModule} from 'angular-confirmation-popover';
import { PreinscriptionListConcoursComponent } from './espace-prof/preinscription-list/preinscription-list-concours/preinscription-list-concours.component';
import { PreinscriptionListSeuilComponent } from './espace-prof/preinscription-list/preinscription-list-seuil/preinscription-list-seuil.component';
import { PreinscriptionListTypeDiplomeComponent } from './espace-prof/preinscription-list/preinscription-list-type-diplome/preinscription-list-type-diplome.component';
import { LoginUserComponent } from './login-user/login-user.component';

// import {NgModule} from "@angular/core";


const appRoute: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login-user',
    component: LoginUserComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'informations',
    component: InformationsComponent
  },
  {
    path: 'espace-prof',
    component: EspaceProfComponent,
    children: [
      {
        path: '',
        component : CommissionHomeComponent
      },

      {
        path: 'preinscriptionlist',
        component : PreinscriptionListComponent,
        children: [
          {
            path: '',
            component: PreinscriptionListConcoursComponent
          },
          {
            path: 'concours',
            component: PreinscriptionListConcoursComponent
          },
          {
            path: 'type-diplome',
            component: PreinscriptionListTypeDiplomeComponent
          },
          {
            path: 'seuil',
            component: PreinscriptionListSeuilComponent
          }
        ]
      },
      {
        path: 'commission',
        component : CommissionHomeComponent
      },
      {
        path: 'concours',
        component : ConcoursComponent
      },
      {
        path: 'departement',
        component : DepartementComponent
      },
      {
        path: 'type-diplome',
        component : TypeDiplomeComponent
      },
      {
        path: 'users',
        component : UsersComponent
      },
    ]
  },
  {
    path: 'espace-etudiant',
    component: EspaceEtudiantComponent,
    children: [
      {
        path: 'preinscription',
        component : PreinscriptionComponent
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EspaceEtudiantComponent,
    EspaceProfComponent,
    HeaderComponent,
    PreinscriptionComponent,
    NotFoundComponent,
    PreinscriptionListComponent,
    LoginComponent,
    SignupComponent,
    ConcoursComponent,
    ConcoursListComponent,
    ConcoursCreateComponent,
    DepartementComponent,
    DepartementCreateComponent,
    DepartementListComponent,
    TypeDiplomeComponent,
    TypeDiplomeCreateComponent,
    TypeDiplomeListComponent,
    CommissionHomeComponent,
    UsersComponent,
    InformationsComponent,
    PreinscriptionListConcoursComponent,
    PreinscriptionListSeuilComponent,
    PreinscriptionListTypeDiplomeComponent,
    LoginUserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute, {enableTracing: true}),
    HttpClientModule,
    FormsModule,
    FileUploadModule,
    DataTablesModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
