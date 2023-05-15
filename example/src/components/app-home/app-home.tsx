import { Component, h } from '@stencil/core';
import { AppIcon } from '@capacitor-community/app-icon';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  iconNames: string[] = ['ionic', 'stencil', 'ionitron']

  async resetIcon() {
    try {
      await AppIcon.reset({ suppressNotification: true });
    } catch (error) {
      console.debug(error);
    }
  }

  async changeIcon(iconName: string) {
    console.debug('ion-item clicked');

    var disableIcons = this.iconNames.filter(name => name !== iconName)

    try {
      // const isSupported = await AppIcon.isSupported();
      // console.debug(`Alternate Icons Supported: `,isSupported.value);
  
      // let setIconName = await AppIcon.getName();
      // console.debug(`App Icon set to: `,setIconName.value);
      
      await AppIcon.change({name: iconName, suppressNotification: true, disable: disableIcons});
      
      // setIconName = await AppIcon.getName();
      // console.debug(`App Icon set to: `,setIconName.value);

    } catch (error) {
      console.debug(error);
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
            <ion-label>Alternate Icons</ion-label>
          </ion-list-header>
          <ion-item button onClick={() => this.changeIcon('ionic')}>
            <ion-thumbnail slot="start">
              <img src="/assets/icon/ionic.png" />
            </ion-thumbnail>
            <ion-label>
              <h3>Ionic Icon</h3>
            </ion-label>
          </ion-item>
          <ion-item button onClick={() => this.changeIcon('stencil')}>
            <ion-thumbnail slot="start">
              <img src="/assets/icon/icon192.png" />
            </ion-thumbnail>
            <ion-label>
              <h3>Stencil Icon</h3>
            </ion-label>
          </ion-item>
          <ion-item button onClick={() => this.changeIcon('ionitron')}>
            <ion-thumbnail slot="start">
              <img src="/assets/icon/ionitron.png" />
            </ion-thumbnail>
            <ion-label>
              <h3>Ionitron Icon</h3>
            </ion-label>
          </ion-item>
        </ion-list>

        <ion-button class="ion-margin" onClick={() => this.resetIcon()} expand="block">
          Reset to Original
        </ion-button>
      </ion-content>,
    ];
  }
}
