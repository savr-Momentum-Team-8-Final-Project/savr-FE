import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, View , Image} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from './components/Homepage.js'
import Login from './components/Login'
import CreateATrip from './components/CreateATrip.js'
import Register from './components/Register.js'
import Profile from './components/Profile.js'
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();
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
      <>
    <NavigationContainer>
        <SafeAreaView style={styles.container} />
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fffcf5' }}>
            <Tab.Navigator screenOptions={{
                headerShown: false,
                'tabBarActiveTintColor': '#00C244',
                'tabBarStyle': [
                    {
                        display: 'flex',
                        backgroundColor: '#fffcf5'
                    },
                    null
                ]
                }}>
                <Tab.Screen name="Trips" component={Homepage} options={{
                    tabBarIcon: (props) => <Ionicons name="ios-menu" size={props.size} color={props.color}/>
                }}/>
                <Tab.Screen name="Current Trip" component={Profile} options={{
                    tabBarIcon: (props) => <Ionicons name="ios-paper-plane" size={props.size} color={props.color}/>
                }}/>
                <Tab.Screen name="Analytics" component={CreateATrip} options={{
                    tabBarIcon: (props) => <Ionicons name="ios-flask" size={props.size} color={props.color}/>
                }}/>
            </Tab.Navigator>
        </SafeAreaView>
    </NavigationContainer>
    {/* <NavigationContainer>
    <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Home" component={Homepage} />
                <Stack.Screen name="CreateATrip" component={CreateATrip} />
                <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
    </NavigationContainer> */}
    </>
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
