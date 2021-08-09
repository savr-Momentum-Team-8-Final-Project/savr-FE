import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import Homepage from './components/Homepage.js'
import Login from './components/Login'
import Profile from './components/Profile'

export default function App () {
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#e3e3e3' }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#e3e3e3' }}>
        {/* <View style={styles.container}> */}
        {/* <StatusBar style='auto' />
          <Login style='auto' /> */}
        <Profile />
        {/* <Homepage /> */}
        {/* </View> */}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: 'tan',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
