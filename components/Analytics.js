import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, View , Image, Pressable, ScrollView, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { requestTrips, requestExpenses } from '../api.js'
import CreateAnExpense from './CreateAnExpense'
import moment from 'moment';
import axios from 'axios';


export default function Analytics () {
    return (
        <>
        <Text style={styles.logo}>s a v r</Text>
        <View style={styles.mainView}>
            <Text>←recent                 Current trip               all time→</Text>
            <Image source={require('../assets/1024px-Donut-Chart.svg.png')} style={styles.graph}></Image>
            <Text>⚪️ ⚫️ ⚪️</Text>
            <View style={{justifyContent: 'center', padding: 50}}>
            <Text>🟦 - Lodging 34%</Text>
            <Text>🟩 - Other 15%</Text>
            <Text>🟨 - Food 12%</Text>
            <Text>🟧 - Transportation 7%</Text>
            </View>
        </View>
        </>
    )
}


const styles = StyleSheet.create({
    logo: {
        fontSize: 32,
        fontWeight: '200',
        backgroundColor: '#fffcf5',
        paddingLeft: 150,
        paddingRight: 150,
        fontFamily: 'GilroyLight'
      },
      graph: {
        width: 250,
        height: 250,
        marginTop: 30,
        marginBottom: 60
    },
    mainView: {
        backgroundColor: '#fffcf5',
        padding: 20,
        alignItems: 'center'
    }
  })