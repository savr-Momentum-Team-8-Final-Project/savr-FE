import React from 'react'
import { StyleSheet, View } from 'react-native'
import Profile from './components/Profile'
import { StatusBar } from 'expo-status-bar'
import Login from './components/Login'

export default function App () {
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Login style='auto' />
      <Profile />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tan',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
