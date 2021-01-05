import { WebPlugin } from '@capacitor/core';
import { AppIconPlugin } from './definitions';

export class AppIconWeb extends WebPlugin implements AppIconPlugin {
  constructor() {
    super({
      name: 'AppIcon',
      platforms: ['web'],
    });
  }

  async supportsAlternateIcons(): Promise<boolean> {
    throw new Error("supportsAlternateIcons not available");
  }

}

const AppIcon = new AppIconWeb();

export { AppIcon };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(AppIcon);
