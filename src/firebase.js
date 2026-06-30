import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCRs3wowJb2TZ_mtlmUGt2ZIrxuWekF61I',
  authDomain: 'mythica-ef3d1.firebaseapp.com',
  projectId: 'mythica-ef3d1',
  storageBucket: 'mythica-ef3d1.firebasestorage.app',
  messagingSenderId: '301120116814',
  appId: '1:301120116814:web:0b40b969d3975ce8878b1f',
  measurementId: 'G-9VXPX2FR4L',
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

export const db = getFirestore(app)
export const storageInstance = getStorage(app)
