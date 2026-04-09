import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
          screenOptions={{
                 tabBarStyle: { display: 'none' },
              headerShown: false,
               }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Mythica',
       
        }}
      />
    </Tabs>
  );
}
