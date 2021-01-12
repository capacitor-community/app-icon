import { Component, h } from '@stencil/core';
import { Plugins } from '@capacitor/core';

const { AppIcon } = Plugins;

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {

  async resetIcon() {
    try {
      await AppIcon.reset()
    } catch (error) {
      console.debug(error)
    }
  }

  async changeIcon(iconName: string) {
    console.debug('ion-item clicked')

    try {
      const isSupported = await AppIcon.isSupported();
      console.debug(`Alternate Icons Supported: `,isSupported.value);
  
      let setIconName = await AppIcon.getName();
      console.debug(`App Icon set to: `,setIconName.value);
      
      await AppIcon.change({name: iconName});
      
      setIconName = await AppIcon.getName();
      console.debug(`App Icon set to: `,setIconName.value);
    } catch (error) {
      console.debug(error)
    }
  }

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
          <ion-item button onClick={() => this.changeIcon('ionic-icon')}>
            <ion-thumbnail slot="start">
              <img src="/assets/icon/ionic-icon.png" />
            </ion-thumbnail>
            <ion-label>
              <h3>Ionic Icon</h3>
            </ion-label>
          </ion-item>
          <ion-item button onClick={() => this.changeIcon('stencil-icon')}>
            <ion-thumbnail slot="start">
              <img src="/assets/icon/icon192.png" />
            </ion-thumbnail>
            <ion-label>
              <h3>Stencil Icon</h3>
            </ion-label>
          </ion-item>
          <ion-item button onClick={() => this.changeIcon('ionitron-icon')}>
            <ion-thumbnail slot="start">
              <img src="/assets/icon/ionitron-icon.png" />
            </ion-thumbnail>
            <ion-label>
              <h3>Ionitron Icon</h3>
            </ion-label>
          </ion-item>
        </ion-list>

        <ion-button class="ion-margin" onClick={() => this.resetIcon()} expand="block">Reset to Original</ion-button>
      
      </ion-content>,
    ];
  }
}
