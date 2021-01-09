import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Swap App Icon</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>

        <ion-list id="data">
          <ion-list-header>
            <ion-label>
              Alternate Icons
            </ion-label>
          </ion-list-header>
          <ion-item button>
            <ion-thumbnail slot="start">
              <img src="/assets/icon/ionic-icon.png" />
            </ion-thumbnail>
            <ion-label>
              <h3>Ionic Icon</h3>
            </ion-label>
          </ion-item>
          <ion-item button>
            <ion-thumbnail slot="start">
            <img src="/assets/icon/icon192.png" />
            </ion-thumbnail>
            <ion-label>
              <h3>Stencil Icon</h3>
            </ion-label>
          </ion-item>
          <ion-item button>
            <ion-thumbnail slot="start">
            <img src="/assets/icon/ionitron-icon.png" />
            </ion-thumbnail>
            <ion-label>
              <h3>Ionitron Icon</h3>
            </ion-label>
          </ion-item>
        </ion-list>
      
      </ion-content>,
    ];
  }
}
