import { WebPlugin } from '@capacitor/core';

import { AppIconPlugin } from './definitions';

export class AppIconWeb extends WebPlugin implements AppIconPlugin {

  isSupported(): Promise<{value: boolean}> {
    throw this.unimplemented('isSupported not available');
  }
  
  getName(): Promise<{value: string | null}> {
    throw this.unimplemented('getName not available');
  }
  
  change(): Promise<any> {
    throw this.unimplemented('change not available');
  }
  
  reset(): Promise<any> {
    throw this.unimplemented('reset not available');
  }
  
  // async appIconBadgeNumber(): Promise<{value: number}> {
  //   throw new Error("appIconBadgeNumber not available");
  // }
}

const AppIcon = new AppIconWeb();

export { AppIcon };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(AppIcon);
