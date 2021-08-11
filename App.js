import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, View , Image} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from './components/Homepage.js'
import Login from './components/Login'
import CreateATrip from './components/CreateATrip.js'
import Register from './components/Register.js'
import Profile from './components/Profile.js'
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();


export default function App () {

    const [loaded] = useFonts({
        GilroyLight: require('./assets/fonts/Gilroy-Light.otf'),
        GilroyBold: require('./assets/fonts/Gilroy-ExtraBold.otf')
      })

      if (!loaded) {
        return null;
      }

  return (
    <NavigationContainer>
        <SafeAreaView style={styles.container} />
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fffcf5' }}>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Home" component={Homepage} />
                <Stack.Screen name="CreateATrip" component={CreateATrip} />
                <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
        </SafeAreaView>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: 'tan',
    backgroundColor: '#fffcf5',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'GilroyLight'
  }
})
