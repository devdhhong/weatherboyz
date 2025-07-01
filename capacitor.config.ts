import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.devdhhong.weatherboyz',
  appName: 'weatherboyz',
  webDir: 'dist',
  server: {
    url: 'https://weatherboyz.netlify.app',  // 실제 배포 주소
    cleartext: true
  }
};

export default config;
