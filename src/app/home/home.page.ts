import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { CaptionModalComponent } from '../components/caption-modal.component';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  photos: { image: string; date: string; caption: string; edited?: boolean }[] =
    [];
  private _storage: Storage | null = null;

  constructor(
    private modalController: ModalController,
    private storage: Storage
  ) {
    this.initStorage();
  }

  async initStorage() {
    const storage = await this.storage.create();
    this._storage = storage;
    const storedPhotos = await this._storage.get('photos');
    if (storedPhotos) this.photos = storedPhotos;
  }

  async savePhotos() {
    await this._storage?.set('photos', this.photos);
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    const modal = await this.modalController.create({
      component: CaptionModalComponent,
    });

    modal.onDidDismiss().then((data) => {
      const caption = data.data;
      if (caption) {
        this.photos.push({
          image: image.dataUrl || '',
          date: new Date().toLocaleDateString(),
          caption,
        });
        this.savePhotos();
      }
    });

    await modal.present();
  }

  editPhoto(index: number) {
    const photo = this.photos[index];

    this.modalController
      .create({
        component: CaptionModalComponent,
        componentProps: {
          caption: photo.caption,
        },
      })
      .then((modal) => {
        modal.onDidDismiss().then((data) => {
          const updatedCaption = data.data;
          if (updatedCaption) {
            this.photos[index].caption = updatedCaption; // Actualiza el caption de la foto
            this.photos[index].edited = true;
            this.savePhotos();
          }
        });
        modal.present();
      });
  }

  async deletePhoto(index: number) {
    this.photos.splice(index, 1); // Elimina la foto del array
    await this.savePhotos();
  }
}
