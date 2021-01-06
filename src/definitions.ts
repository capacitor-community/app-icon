declare module '@capacitor/core' {
  interface PluginRegistry {
    AppIcon: AppIconPlugin;
  }
}


export interface AppIconPlugin {
  supportsAlternateIcons(): Promise<{value: boolean}>;
  appIconBadgeNumber(): Promise<{value: number}>;
  alternateIconName(): Promise<{value: string}>;
  setAlternateIconName(name: string, showNotification: boolean): Promise<any>;
}