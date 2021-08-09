import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View , Image} from 'react-native';
import Homepage from './components/Homepage.js'
import Login from './components/Login'
import CreateATrip from './components/CreateATrip.js'
import Register from './components/Register.js'

export default function App () {
  return (
    <>
    <SafeAreaView style={styles.container} />
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e3e3e3' }}>
        <CreateATrip />
    </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#e3e3e3',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

