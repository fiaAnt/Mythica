import { db } from '@/firebase'
import i18n from '@/i18n'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import { arrayUnion, collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { Platform } from 'react-native'

export async function registerForPushNotificationsAsync(userId?: string): Promise<string | null> {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
      })
    }
    const projectId = Constants.expoConfig?.extra?.eas?.projectId
    if (!projectId) {
      return null
    }

    const token = await Notifications.getExpoPushTokenAsync({ projectId })
    if (userId && token.data) {
      const userRef = doc(db, 'users', userId)
      await setDoc(
        userRef,
        {
          expoPushToken: token.data,
          pushTokens: arrayUnion(token.data),
          lastPushTokenUpdate: new Date().toISOString(),
          notificationsEnabled: true,
        },
        { merge: true },
      )
    }

    return token.data
  } catch (error) {
    console.error('Push registration error:', error)
    return null
  }
}

export async function setupWeeklyNotificationChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('weekly-channel', {
      name: 'Weekly reminders',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
    })
  }
}
async function getRandomNotificationContent(): Promise<{
  title: string
  body: string
}> {
  try {
    const currentLanguage = i18n.language
    const language = currentLanguage === 'ru' ? 'ru' : 'en'
    const pushCollection = collection(db, `push_${language}`)
    const pushSnapshot = await getDocs(pushCollection)
    const documents = pushSnapshot.docs
    const randomIndex = Math.floor(Math.random() * documents.length)
    const randomDoc = documents[randomIndex]
    const data = randomDoc.data()
    return {
      title: data.title || 'Mythica',
      body: data.body || 'New myths await you!',
    }
  } catch (error) {
    console.error('Error getting random notification content:', error)
    return {
      title: 'Mythica',
      body: 'New myths await you!',
    }
  }
}

export async function scheduleWeeklyNotification() {
  try {
    const { title, body } = await getRandomNotificationContent()
    await Notifications.cancelAllScheduledNotificationsAsync()

    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: { screen: 'profile', type: 'weekly' },
        sound: 'default',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
        weekday: 3,
        hour: 13,
        minute: 4,
      },
    })
    return true
  } catch (error) {
    console.error('Error:', error)
    return false
  }
}

export async function cancelAllScheduledNotifications() {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync()
    return true
  } catch (error) {
    console.error('Error cancelling notifications:', error)
    return false
  }
}
