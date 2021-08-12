import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, View , Image, Pressable, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default function Trip (props) {
    const { setSelectedTrip } = props
    return (
        <>
        <Text style={styles.logo}>s a v r</Text>
        <ScrollView style={styles.scrollView}>

        </ScrollView>
        <Pressable style={styles.button} title='go back' onPress={() => setSelectedTrip(null)}>
            <Text style={styles.buttonText}>go back</Text>
        </Pressable>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 0,
      backgroundColor: '#fffcf5',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'GilroyLight'
    },
    logo: {
        fontSize: 32,
        fontWeight: '200',
        backgroundColor: '#fffcf5',
        paddingLeft: 150,
        paddingRight: 150,
        fontFamily: 'GilroyLight'
      },
      scrollView: {
        backgroundColor: '#fffcf5',
        padding: 20
      },
      button: {
        backgroundColor: '#fffcf5',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      },
      buttonText: {
        fontFamily: 'GilroyLight',
        fontSize: 20
      }
  })