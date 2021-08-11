import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from './Homepage.js';
import Profile from './Profile.js'

const Tab = createBottomTabNavigator();

export default function Header ({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}><Text style={styles.profile}>👤</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CreateATrip')}><Text style={styles.add}>➕</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}><Text style={styles.add}>🏠</Text></TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fffcf5'
  },
  logo: {
    fontSize: 30,
    fontWeight: '200'
  },
  profile: {
    fontSize: 30
  },
  add: {
    fontSize: 30
  }
})