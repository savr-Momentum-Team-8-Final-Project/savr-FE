import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, View , Image, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default function Trip (props) {
    const { setSelectedTrip } = props
    return (
        <>
        <Text>hey there, you made it!</Text>
        <Button title='go back' onPress={() => setSelectedTrip(null)}></Button>
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