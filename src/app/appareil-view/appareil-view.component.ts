import { AppareilService } from './../services/appareil.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss'],
})
export class AppareilViewComponent implements OnInit {
  isAuth = false;
  // permet de rendre une date disponible au bout de 2 seconde
  // on simule le fait d'aller chercher des doonnées sur un serveur en utilsant ensuit le pipe async dans le html
  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(() => {
      // revole la promesse avec l'obet date au bout de 2 seconde
      resolve(date);
    }, 2000);
  });
  appareils: any[];
  appareilSubscription: Subscription;

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private appareilService: AppareilService) {
    setTimeout(() => {
      this.isAuth = true;
    }, 4000);
  }

  ngOnInit(): void {
    this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppareilSubject();
  }

  onAllumer(): void {
    // console.log('On allume tout !');
    this.appareilService.switchOnAll();
  }
  onEteindre() {
    this.appareilService.switchOffAll();
  }

  onSave() {
    this.appareilService.saveAppareilsToServer();
}
}
