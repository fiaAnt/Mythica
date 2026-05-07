# Mythica

**Mythica** is a mobile application for studying gods, heroes, and monsters from three great mythologies: Greek, Norse, and Egyptian. The app helps users systematize their knowledge, track progress, and discover connections between different cultures.

##  Key Features

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

###  Interface
- **Theme customization** (light / dark)
- Responsive design

### Notifications & Recommendations
-  **"Myth of the Day"** push notification featuring an interesting fact or a rare creature
- After studying a character, automatic recommendation of a similar figure

---

## Technology Stack

| Component       | Technologies                           |
|----------------|----------------------------------------|
| Frontend (Mobile)  | React Native (Expo) + TypeScript               |
| Database           | Firebase Firestore                   |
| Localization       | i18next                                        |
| Navigation         | Expo Router                                     |
| State Management   | React Hooks (useState, useEffect, useContext)  |
| Push Notifications | Expo Notifications          


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
