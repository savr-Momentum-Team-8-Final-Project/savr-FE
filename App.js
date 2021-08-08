import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View , Image} from 'react-native';
import Homepage from './components/Homepage.js'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        <Homepage />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
