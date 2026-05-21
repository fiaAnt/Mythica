<<<<<<< HEAD
# Mythica

**Mythica** is a mobile application for studying gods, heroes, and monsters from three great mythologies: Greek, Norse, and Egyptian. The app helps users systematize their knowledge, track progress, and discover connections between different cultures.

## Key Features

### Profiles

- Automatic saving of studied characters to the **Explored** section

### Studying Characters

- Articles about gods, heroes, and monsters with complete descriptions
- Character automatically added to explored list after reading the full article
- Add **personal notes** to any character

### Progress Tracking

- List of all studied characters
- **Progress tracker** for each pantheon (% of characters studied)
- **Achievements** awarded for milestones: e.g., 5, 10, 25, 50 studied characters

### Search & Filters

- Search characters by name
- Filters:
  - By pantheon (Greek, Norse, Egyptian)
  - By type (god, hero, monster)
  - By studied status (studied / not studied)

### Interface

- **Theme customization** (light / dark)
- Responsive design

### Notifications & Recommendations

- **"Myth of the Day"** push notification featuring an interesting fact or a rare creature
- After studying a character, automatic recommendation of a similar figure

---

## Technology Stack

| Component          | Technologies                                  |
| ------------------ | --------------------------------------------- |
| Frontend (Mobile)  | React Native (Expo) + TypeScript              |
| Database           | Firebase Firestore                            |
| Localization       | i18next                                       |
| Navigation         | Expo Router                                   |
| State Management   | React Hooks (useState, useEffect, useContext) |
| Push Notifications | Expo Notifications                            |

---

## Quick Start (Local Development)

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (Xcode) or Android Emulator
- Firebase account

### Backend Setup (example for Node.js + Express)

```bash
# Clone repository
git clone https://github.com/safiyaAntanenka/mythica
cd mythica/backend

# Install dependencies
npm install

# Configure Firebase
# 1. Create a project in Firebase Console
# 2. Add iOS and Android apps
# 3. Download config files and place them in the project
# 4. Create a Web app and copy firebaseConfig to firebase.js

# Start the development server
npx expo start

# Run on iOS
# Press 'i' in terminal

# Run on Android
# Press 'a' in terminal

```
=======
# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
>>>>>>> feat/screen-structure
