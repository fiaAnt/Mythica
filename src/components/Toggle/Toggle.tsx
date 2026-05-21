import { AppText } from '@/components/ui/AppText';
import React, { useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';

export const Toggle: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View style={styles.switchContainer}>
      <AppText variant="body">Only unexplored:</AppText>
      <Switch
        style={styles.switch}
        trackColor={{ false: '#767577', true: '#DFD4C2' }}
        thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 20,
    marginBottom: 10,
  },
  switch: {
    transform: [{ scale: 0.8 }],
  },
});
