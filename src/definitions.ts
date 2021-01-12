declare module '@capacitor/core' {
  interface PluginRegistry {
    AppIcon: AppIconPlugin;
  }
}

interface IconOptions {
  name: string;
  suppressNotification: boolean
}

export interface AppIconPlugin {
  /**
   * Checks if changing the app icon is supported
   */
  isSupported(): Promise<{value: boolean}>;
  /**
   * Gets the name of currently set alternate icon. If original icon is set, returns null.
   */
  getName(): Promise<{value: string | null}>;
  /**
   * Changes app icon to specified alternate. 
   */
  change(options: IconOptions): Promise<void>;
  /**
   * Reverts app icon to original. 
   * */
  reset(suppressNotification: boolean): Promise<void>;
  
  // appIconBadgeNumber(): Promise<{value: number}>;
}