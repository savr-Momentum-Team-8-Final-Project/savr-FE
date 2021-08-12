import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, View , Image, Pressable, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const expenses = [
    {
        "id": 1,
        "user": "admin",
        "trip": 1,
        "expense_title": "expense1",
        "amount": 1,
        "price": "50.00",
        "total_cost": 50.0,
        "category": "ticket",
        "note": "note1",
        "date": "2021-08-07"
    },
    {
        "id": 2,
        "user": "admin",
        "trip": 1,
        "expense_title": "expense2",
        "amount": 4,
        "price": "25.00",
        "total_cost": 100.0,
        "category": "grocery",
        "note": "note2",
        "date": "2021-08-17"
    }
]


export default function Trip (props) {
    const { setSelectedTrip, selectedTrip } = props

    return (
        <>
        <Text style={styles.logo}>s a v r</Text>
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View>
                <Text>{selectedTrip.city}</Text>
                <View>
                    <Text>{selectedTrip.startDate}</Text>
                    <Text>{selectedTrip.endDate}</Text>
                </View>
            </View>
            <Text>${selectedTrip.budget}</Text>
            <Image source={require('../assets/1024px-Donut-Chart.svg.png')} style={styles.graph}></Image>
            <Text>60% of your budget went to food. Yum!</Text>

            
            {expenses.map((expense, index) => {
                return (
                    <View style={styles.expense}>
                    <Text>{expense.date}</Text>
                    <Text>{expense.expense_title}</Text>
                    <Text>{expense.amount}</Text>
                    <Text>{expense.price}</Text>
                    <Text>{expense.total_cost}</Text>
                    <Text>{expense.category}</Text>
                    </View>
                )
            })}
            
        <Pressable style={styles.button} title='go back' onPress={() => setSelectedTrip(null)}>
            <Text style={styles.buttonText}>go back</Text>
        </Pressable>
        </ScrollView>
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
      scrollView: {
        backgroundColor: '#fffcf5',
        padding: 20,
        alignItems: 'center'
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
      },
      graph: {
          width: 250,
          height: 250,
          marginTop: 30,
          marginBottom: 60
      },
      expense: {
          marginBottom: 40,
          marginTop: 20,
          width: '100%',
          backgroundColor: '#f0f0f0',
          borderRadius: 10,
          padding: 10,

      }
  })