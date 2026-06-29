import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import '@react-native-firebase/storage'

const app = firebase.apps.length === 0 ? firebase.initializeApp() : firebase.app()

export const db = firebase.firestore()
export const storage = firebase.storage()
