import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  Screen,
  AsyncStorage
} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from './components/Homepage.js';
import Login from './components/Login';
import CreateATrip from './components/CreateATrip.js';
import Register from './components/Register.js';
import Analytics from './components/Analytics.js';
import CurrentTrip from './components/CurrentTrip.js';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {
  Appearance,
  AppearanceProvider,
  useColorScheme
} from 'react-native-appearance';
import { axios } from 'react-native-axios';
import { requestLogout } from './api.js';
import { render } from 'react-dom';

const Tab = createBottomTabNavigator()

export default function App ({ navigation }) {
  const [registering, setRegistering] = useState(false)
  const [authToken, setAuthToken] = useState('')
  const [loaded] = useFonts({
    GilroyLight: require('./assets/fonts/Gilroy-Light.otf'),
    GilroyBold: require('./assets/fonts/Gilroy-ExtraBold.otf')
  })
  useEffect(() => {}, [authToken])
  const storeData = async (token) => {
    try {
      await AsyncStorage.setItem('token', token)
    } catch (error) {
      return error
    }
  }
  if (!loaded) {
    return null
  }
  console.log(
    AsyncStorage.getItem('token', (err, token) => {
      token ? setAuthToken(token) : Promise.reject(err)
    })
  )

  console.log('Auth token', authToken)
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container} />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <Tab.Navigator
          initialRouteName='Login'
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#00C244',
            tabBarStyle: [
              {
                display: 'flex',
                backgroundColor: '#ffffff'
              },
              null
            ]
          }}
        >
          {!authToken ? (
            <Tab.Screen
              style={styles.login}
              name='Powered by React Native'
              options={{
                tabBarIcon: (props) => (
                  <Ionicons name='logo-react' color='#00C244' />
                )
              }}
            >
              {(props) => (
                <Login
                  storeData={storeData}
                  setAuthToken={setAuthToken}
                  registering={registering}
                  setRegistering={setRegistering}
                />
              )}
            </Tab.Screen>
          ) : (
            <>
              <Tab.Screen
                name='Current Trip'
                children={() => (
                  <CurrentTrip
                    authToken={authToken}
                    setRegistering={setRegistering}
                    setAuthToken={setAuthToken}
                  />
                )}
                options={{
                  tabBarIcon: (props) => (
                    <Ionicons
                      name='ios-paper-plane'
                      size={props.size}
                      color={props.color}
                    />
                  )
                }}
              />
              <Tab.Screen
                name='Stats'
                children={() => <Analytics authToken={authToken} />}
                options={{
                  tabBarIcon: (props) => (
                    <Ionicons
                      name='pie-chart'
                      size={props.size}
                      color={props.color}
                    />
                  )
                }}
              />
              <Tab.Screen
                name='Trips'
                children={() => <Homepage authToken={authToken} />}
                options={{
                  tabBarIcon: (props) => (
                    <Ionicons
                      name='albums'
                      size={props.size}
                      color={props.color}
                    />
                  )
                }}
              />
            </>
          )}
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
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
