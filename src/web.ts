import { WebPlugin } from '@capacitor/core';
import { AppIconPlugin } from './definitions';

export class AppIconWeb extends WebPlugin implements AppIconPlugin {
  constructor() {
    super({
      name: 'AppIcon',
      platforms: ['web'],
    });
  }

  isSupported(): Promise<{value: boolean}> {
    throw new Error('isSupported not available on web');
  }
  
  getName(): Promise<{value: string | null}> {
    throw new Error('getName not available on web');
  }
  
  change(): Promise<any> {
    throw new Error('change not available on web');
  }
  
  reset(): Promise<any> {
    throw new Error('reset not available on web');
  }
}

const AppIcon = new AppIconWeb();

export { AppIcon };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(AppIcon);
