import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from './components/Homepage.js'
import Login from './components/Login'
import CreateATrip from './components/CreateATrip.js'
import Register from './components/Register.js'
import Analytics from './components/Analytics.js'
import CurrentTrip from './components/CurrentTrip.js'
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {
  Appearance,
  AppearanceProvider,
  useColorScheme
} from 'react-native-appearance';

const Tab = createBottomTabNavigator()

export default function App () {
  const [loaded] = useFonts({
    GilroyLight: require('./assets/fonts/Gilroy-Light.otf'),
    GilroyBold: require('./assets/fonts/Gilroy-ExtraBold.otf')
  })

  if (!loaded) {
    return null
  }

  return (
      <>
    <NavigationContainer>
        <SafeAreaView style={styles.container} />
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <Tab.Navigator screenOptions={{
                headerShown: false,
                'tabBarActiveTintColor': '#00C244',
                'tabBarStyle': [
                    {
                        display: 'flex',
                        backgroundColor: '#ffffff'
                    },
                    null
                ]
                }}>
                <Tab.Screen name="Current Trip" component={CurrentTrip} options={{
                    tabBarIcon: (props) => <Ionicons name="ios-paper-plane" size={props.size} color={props.color}/>
                }}/>
                <Tab.Screen name="Analytics" component={Analytics} options={{
                    tabBarIcon: (props) => <Ionicons name="ios-flask" size={props.size} color={props.color}/>
                }}/>
                <Tab.Screen name="Trips" component={Homepage} options={{
                    tabBarIcon: (props) => <Ionicons name="ios-menu" size={props.size} color={props.color}/>
                }}/>
            </Tab.Navigator>
          </SafeAreaView>
        </NavigationContainer>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'GilroyLight'
  }
})
