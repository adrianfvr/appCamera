import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-caption-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Añadir Caption</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-item>
        <ion-label position="stacked">Caption</ion-label>
        <ion-input [(ngModel)]="caption"></ion-input>
      </ion-item>
      <ion-button expand="full" (click)="save()">Guardar</ion-button>
    </ion-content>
  `,
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class CaptionModalComponent {
  @Input() caption: string = '';

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }

  save() {
    this.modalController.dismiss(this.caption);
  }
}
