import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InstallService {

  deferredPrompt: any = null;

  puedeInstalar = false;

  esIOS = false;

  constructor(
    private zone: NgZone
  ) {

    this.detectarIOS();

    window.addEventListener(
      'beforeinstallprompt',
      (event: any) => {

        console.log('✅ PWA instalable');

        event.preventDefault();

        this.zone.run(() => {

          this.deferredPrompt = event;

          this.puedeInstalar = true;

        });

      }
    );

  }

  private detectarIOS(): void {

    const userAgent = window.navigator.userAgent;

    this.esIOS =
      /iPad|iPhone|iPod/.test(userAgent);

  }

  async instalar(): Promise<void> {

    if (!this.deferredPrompt) {
      return;
    }

    this.deferredPrompt.prompt();

    await this.deferredPrompt.userChoice;

    this.deferredPrompt = null;

    this.puedeInstalar = false;

  }

}