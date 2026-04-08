import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'home',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>!</Text>,
        }}
      />
    </Tabs>
  );
}
