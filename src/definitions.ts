declare module '@capacitor/core' {
  interface PluginRegistry {
    AppIcon: AppIconPlugin;
  }
}


export interface AppIconPlugin {
  supportsAlternateIcons(): Promise<{value: boolean}>;
  // appIconBadgeNumber(): Promise<{value: number}>;
  getName(): Promise<{value: string | null}>;
  change(iconName: string): Promise<any>;
}