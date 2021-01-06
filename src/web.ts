import { WebPlugin } from '@capacitor/core';
import { AppIconPlugin } from './definitions';

export class AppIconWeb extends WebPlugin implements AppIconPlugin {
  constructor() {
    super({
      name: 'AppIcon',
      platforms: ['web'],
    });
  }

  async supportsAlternateIcons(): Promise<{value: boolean}> {
    throw new Error("supportsAlternateIcons not available");
  }

  async appIconBadgeNumber(): Promise<{value: number}> {
    throw new Error("appIconBadgeNumber not available");
  }

  async alternateIconName(): Promise<{value: string}> {
    throw new Error("appIconBadgeNumber not available");
  }

  async setAlternateIconName(): Promise<any> {
    throw new Error("setAlternateIconName not available");
  }

}

const AppIcon = new AppIconWeb();

export { AppIcon };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(AppIcon);
