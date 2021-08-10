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

const Stack = createStackNavigator();
const stopWords = ['UM-84', 'UM-81', 'UM-89', 'UM-79', 'UM-86', 'UM-67', 'UM-71', 'UM-76', 'UM-95']


export default function App () {


  return (
    <NavigationContainer>
        <SafeAreaView style={styles.container} />
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e3e3e3' }}>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Home" component={Homepage} />
                <Stack.Screen name="CreateATrip" component={CreateATrip} />
            </Stack.Navigator>
        </SafeAreaView>
    </NavigationContainer>
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

