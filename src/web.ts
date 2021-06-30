import { WebPlugin } from '@capacitor/core';
import { AppIconPlugin } from './definitions';

export class AppIconWeb extends WebPlugin implements AppIconPlugin {
  isSupported(): Promise<{value: boolean}> {
    throw this.unimplemented('isSupported not available on web');
  }
  
  getName(): Promise<{value: string | null}> {
    throw this.unimplemented('getName not available on web');
  }
  
  change(): Promise<any> {
    throw this.unimplemented('change not available on web');
  }
  
  reset(): Promise<any> {
    throw this.unimplemented('reset not available on web');
  }
}