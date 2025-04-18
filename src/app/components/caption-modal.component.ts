import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-caption-modal',
  styleUrls: ['caption-modal.component.scss'],
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
        <ion-input
          [(ngModel)]="caption"
          (input)="validateCaption()"
        ></ion-input>
      </ion-item>
      <div *ngIf="isCaptionEmpty" class="warning-text">
        El caption no puede estar vacío
      </div>

      <ion-button expand="full" [disabled]="isCaptionEmpty" (click)="save()"
        >Guardar</ion-button
      >
    </ion-content>
  `,
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class CaptionModalComponent {
  @Input() caption: string = '';
  isCaptionEmpty: boolean = true;
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.validateCaption();
  }

  validateCaption() {
    this.isCaptionEmpty = !this.caption || this.caption.trim() === '';
  }

  dismiss() {
    this.modalController.dismiss();
  }

  save() {
    this.modalController.dismiss(this.caption);
  }
}
