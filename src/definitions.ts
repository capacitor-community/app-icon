declare module '@capacitor/core' {
  interface PluginRegistry {
    AppIcon: AppIconPlugin;
  }
}

export interface AppIconPlugin {
  supportsAlternateIcons(): Promise<boolean>;
  // alternateIconName(): Promise<string>;
  // setAlternateIconName(name: string): Promise<any>;
}
