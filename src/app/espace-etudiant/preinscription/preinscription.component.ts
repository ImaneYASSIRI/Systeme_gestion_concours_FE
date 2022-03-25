import { Component, OnInit } from '@angular/core';
import {Concours} from '../../controller/model/concours.model';
import {TypeDiplome} from '../../controller/model/type-diplome.model';
import {Inscription} from '../../controller/model/inscription.model';
import {Etudiant} from '../../controller/model/etudiant.model';
import {PreinscriptionService} from '../../controller/service/preinscription.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {Router} from '@angular/router';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {ConfigConcours} from '../../controller/model/config-concours.model';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-preinscription',
  templateUrl: './preinscription.component.html',
  styleUrls: ['./preinscription.component.css']
})


export class PreinscriptionComponent implements OnInit {

  typeDiplomeHasError = true;
  configConcoursHasError = true;
  concoursHasError = true;
  submitted = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;

  //etudiant = new Etudiant();

  constructor(private preinscriptionService: PreinscriptionService, private etudiantService: EtudiantService, private router: Router) {
   /* if (!this.etudiant.inscriptions || this.etudiant.inscriptions.length === 0) {
      this.etudiant.inscriptions = [];
      this.etudiant.inscriptions.push(new Inscription());
    }*/
  }

  ngOnInit(): void {
    this.preinscriptionService.getTypeDiplomes();
    this.preinscriptionService.getConfigConcourss();
    this.preinscriptionService.getConcourss();
    this.preinscriptionService.findEtudiantByCne();
    if (this.isLogged === false) {
      this.router.navigate(['/login']);
    }
    /*this.router.navigateByUrl('/espace-etudiant/preinscription', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/espace-etudiant/preinscription']);
    });*/
  }

  get etudiant(): Etudiant {
    return  this.preinscriptionService.etudiant;
  }

  get etudiant2(): Etudiant {
    return  this.preinscriptionService.etudiant2;
  }

  get isLogged(): boolean {
    return  this.etudiantService.isLogged;
  }

  get inscription(): Inscription {
    return  this.preinscriptionService.inscription;
  }

  get typeDiplomes(): Array<TypeDiplome> {
    return this.preinscriptionService.typeDiplomes;
  }

  get configConcourss(): Array<ConfigConcours> {
    return this.preinscriptionService.configConcourss;
  }

  get typeDiplomeSelected(): TypeDiplome {
    return this.preinscriptionService.typeDiplomeSelected;
  }

  get configConcourss2(): Array<ConfigConcours> {
    return this.preinscriptionService.configConcourss2;
  }

  get concourss(): Array<Concours> {
    return this.preinscriptionService.concourss;
  }

  public save() {
    this.submitted = true ;
    this.preinscriptionService.save();
  }

  public addInscription() {
    this.preinscriptionService.addInscription();
  }

  public logOut() {
    this.etudiantService.logOut();
  }

  public findConfigConcoursByTypeDiplomeReference(td: TypeDiplome) {
    return this.preinscriptionService.findConfigConcoursByTypeDiplomeReference(td);
  }


/*  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }*/

  public validateSave() {
    return this.preinscriptionService.validateSave();
  }

  public findEtudiantByCne() {
    return this.preinscriptionService.findEtudiantByCne();
  }

  public  update(id: number, cin: string, cne: string, nom: string, prenom: string, email: string) {
    this.preinscriptionService.update(id, cin, cne, nom, prenom, email);
  }

  public  updateNew(cne: string, etudiant: Etudiant) {
    this.submitted = true ;
    this.preinscriptionService.updateNew(cne, etudiant);
  }

  uploadedFiles: any[] = [];

  onUpload(event) {
    //alert("event is: "+event);
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  validateTypeDiplome(value) {
    if (value === 'default') {
      this.typeDiplomeHasError = true;
    } else {
      this.typeDiplomeHasError = false;
    }
  }

  validateConfigConcours(value) {
    if (value === 'default') {
      this.configConcoursHasError = true;
    } else {
      this.configConcoursHasError = false;
    }
  }

  validateConcours(value) {
    if (value === 'default') {
      this.concoursHasError = true;
    } else {
      this.concoursHasError = false;
    }
  }

 /* onSubmit() {
    this.preinscriptionService.save();
  }*/

  downloadFile(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '_File_Saved_Path');
    link.setAttribute('download', 'file_name.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  change($event) {
    this.changeImage = true;
  }

  changedImage(event) {
    this.selectedFile = event.target.files[0];
  }

  uploadBac() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.preinscriptionService.pushFileToStorageBac(this.currentFileUpload).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          alert('Le fichier a été téléchargé avec succès');
        }
        this.selectedFiles = undefined;
      }
    );
  }

  uploadS1() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.preinscriptionService.pushFileToStorageS1(this.currentFileUpload).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          alert('Le fichier a été téléchargé avec succès');
        }
        this.selectedFiles = undefined;
      }
    );
  }

  uploadS2() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.preinscriptionService.pushFileToStorageS2(this.currentFileUpload).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          alert('Le fichier a été téléchargé avec succès');
        }
        this.selectedFiles = undefined;
      }
    );
  }

  uploadS3() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.preinscriptionService.pushFileToStorageS3(this.currentFileUpload).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          alert('Le fichier a été téléchargé avec succès');
        }
        this.selectedFiles = undefined;
      }
    );
  }

  uploadS4() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.preinscriptionService.pushFileToStorageS4(this.currentFileUpload).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          alert('Le fichier a été téléchargé avec succès');
        }
        this.selectedFiles = undefined;
      }
    );
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  generatePdf(action = 'open') {
    const documentDefinition = this.getDocumentDefinition();
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(this.etudiant2.cne + '_convocation'); break;
      default: pdfMake.createPdf(documentDefinition).open(); break;
    }
  }

  getDocumentDefinition() {
    return {
      content: [
        /*{
          image: 'data:image/jpeg;base64,...encodedContent...',
          width: 75,
          height: 75,
          alignment : 'right'
        },*/
        {
          text: 'CONVOCATION',
          bold: true,
          color: '#563d7c',
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: this.etudiant2.cne,
              style: 'name'
            },
              {
                text: 'Nom et prénom : ' + this.etudiant2.nom + ' ' +  this.etudiant2.prenom,
              },
              {
                text: 'CIN : ' + this.etudiant.cin,
              },
              {
                text: 'Email : ' + this.etudiant2.email,
              },
              {
                text: 'Téléphone : ' + this.etudiant.telephone,
              },
              {
                text: 'Date de naissance : ' + this.etudiant.dateNaissance,
              },
              {
                text: 'Année d\'obtention du BAC : ' + this.etudiant.anneeBac,
              },
              {
                text: 'Diplôme : ' + this.etudiant.typeDiplome.libelle,
              },
            ],
          ]
        },
        {
          text: 'Concours :',
          color: '#6648b1',
          style: 'header'
        },
        this.getInscriptionObject(this.etudiant.inscriptions),
        /*{
          text: 'Education',
          style: 'header'
        },
        this.getEducationObject(this.resume.educations),
        {
          text: 'Other Details',
          style: 'header'
        },*/
        {
          text: 'Vos moyennes :',
          color: '#6648b1',
          style: 'header'
        },
        {
          table: {
            widths: [ '*', '*', 100, '*' , '*' ],
            body: [
              [ 'Moyenne BAC', 'Moyenne S1', 'Moyenne S2', 'Moyenne S3', 'Moyenne S4' ],
              [ this.etudiant.moyenneBac, this.etudiant.noteS1, this.etudiant.noteS2, this.etudiant.noteS3, this.etudiant.noteS4],
            ]
          }
        },
        {
          text: ' '
        }, {
          text: ' '
        }, {
          text: ' '
        }, {
          text: ' '
        }, {
          text: ' '
        }, {
          text: ' '
        },
        {
          columns : [
            { qr: ' ' + this.etudiant2.nom + ' ' + this.etudiant2.prenom + ',\n CNE : ' + this.etudiant2.cne + '\n Diplôme : ' +
                this.etudiant.typeDiplome.libelle + '\n Vos concours :' +   this.getInscriptionObjectQr(this.etudiant.inscriptions)
            ,
              fit : 100 },
          ]
        }
      ],
      info: {
        title: this.etudiant2.cne + '_convocation',
        author: this.etudiant2.nom,
        subject: 'CONVOCATION',
        keywords: 'Convocation, FSTG Convocation',
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        name: {
          fontSize: 16,
          bold: true
        },
        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true,
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
        }
      }
    };
  }

  getInscriptionObject(inscriptions: Inscription[]) {
    const exs = [];
    inscriptions.forEach(inscription => {
      exs.push(
        [{
          columns: [
            [{
              text: inscription.concours.description,
              style: 'jobTitle'
            },
              {
                text: 'Lieu : La Faculté des Sciences et Techniques de Marrakech',
              }],
            {
              text: 'Date du concours : ' + inscription.concours.dateEcrit,
              alignment: 'right'
            }
          ]
        }]
      );
    });
    return {
      table: {
        widths: ['*'],
        body: [
          ...exs
        ]
      }
    };
  }

  getInscriptionObjectQr(inscriptions: Inscription[]) {
    const exs = [];
    inscriptions.forEach(inscription => {
      exs.push(
        [{
              text: inscription.concours.description,
        }]
      );
    });
    return {
      body: [
        ...exs
      ]
    };
  }

  /*
  getBase64Image(img) {
    // Create an empty canvas element
    let canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    const dataURL = canvas.toDataURL('image/png');

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }*/
}

