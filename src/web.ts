import { WebPlugin } from '@capacitor/core';
import { AppIconPlugin } from './definitions';

export class AppIconWeb extends WebPlugin implements AppIconPlugin {
  constructor() {
    super({
      name: 'AppIcon',
      platforms: ['web'],
    });
  }

  async isSupported(): Promise<{value: boolean}> {
    throw new Error("isSupported not available");
  }
  
  async getName(): Promise<{value: string | null}> {
    throw new Error("getName not available");
  }
  
  async change(): Promise<any> {
    throw new Error("change not available");
  }
  
  async reset(): Promise<any> {
    throw new Error("reset not available");
  }
  
  // async appIconBadgeNumber(): Promise<{value: number}> {
  //   throw new Error("appIconBadgeNumber not available");
  // }
}

const AppIcon = new AppIconWeb();

export { AppIcon };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(AppIcon);
