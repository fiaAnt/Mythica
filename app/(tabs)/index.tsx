import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
      <View style={styles.content}>
        <Text style={styles.title}>Mythica App</Text>
        <Text style={styles.subtitle}>Project Setup Complete</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  status: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 20,
  },
});