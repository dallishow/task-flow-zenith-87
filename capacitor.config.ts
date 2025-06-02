
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.7ca10ca9223f4bf89d9f1207fa532bd7',
  appName: 'task-flow-zenith-87',
  webDir: 'dist',
  server: {
    url: 'https://7ca10ca9-223f-4bf8-9d9f-1207fa532bd7.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;
