import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { display: 'none' },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Mythica',
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'profile',
        }}
      />
    </Tabs>
  )
}
