import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View , Image} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from './components/Homepage.js'
import Login from './components/Login'
import CreateATrip from './components/CreateATrip.js'
import Register from './components/Register.js'
import Profile from './components/Profile'

const Stack = createStackNavigator();

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
    backgroundColor: '#e3e3e3',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
