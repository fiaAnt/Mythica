export default {
  expo: {
    name: 'Mythica',
    slug: 'Mythica',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'mythica',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.anonymous.Mythica',
      googleServicesFile: './GoogleService-Info.plist',
    },
    android: {
      package: 'com.anonymous.Mythica',
      launchMode: 'singleTask',
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/images/iconAndroid.png',
        backgroundImage: './assets/images/iconAndroid.png',
        monochromeImage: './assets/images/iconAndroid.png',
      },
      predictiveBackGestureEnabled: false,
      googleServicesFile: './google-services.json',
      intentFilters: [
        {
          action: 'VIEW',
          data: [
            {
              scheme: 'mythica',
            },
          ],
          category: ['BROWSABLE', 'DEFAULT'],
        },
      ],
    },
    web: {
      output: 'static',
      favicon: './assets/images/favicon.png',
    },

    plugins: [
      'expo-notifications',
      'expo-router',
      'expo-splash-screen',
      'expo-font',
      'expo-web-browser',
      'expo-secure-store',
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      eas: {
        projectId: '052f0218-abd2-411b-964b-b133a2146297',
      },
    },

    runtimeVersion: {
      policy: 'sdkVersion',
    },
  },
}
