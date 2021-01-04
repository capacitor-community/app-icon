declare module '@capacitor/core' {
  interface PluginRegistry {
    AppIcon: AppIconPlugin;
  }
}

export interface AppIconPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
