import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, View , Image, Pressable, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { requestTrips, requestExpenses } from '../api.js'
import moment from 'moment';


const expenses = [
    {
        "id": 1,
        "user": "admin",
        "trip": 1,
        "expense_title": "Uber",
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
        "expense_title": "Museum Tickets",
        "amount": 4,
        "price": "25.00",
        "total_cost": 100.0,
        "category": "grocery",
        "note": "note2",
        "date": "2021-08-08"
    }
]




export default function CurrentTrip () {
    // const { setSelectedTrip, selectedTrip } = props
    const [trips, setTrips] = useState([])
    const [expenses, setExpenses] = useState([])
    const [currentTrip, setCurrentTrip] = useState({})

    const today = moment().format('YYYY-MM-DD')

    useEffect(() => {
        requestTrips()
        .then(data => {
            setTrips(data.data)
        })
    }, [])

    useEffect(() => {
        requestExpenses()
        .then(data => 
            setExpenses(data.data))
    }, [])
    

    useEffect(() => {
        trips.map((trip, index) => {
            if (moment(trip.start_date).isBefore(today) && moment(trip.end_date).isAfter(today)) {
                setCurrentTrip(trip)
        
            }
        })
    }, [trips])

    return (
        <>
        <Text style={styles.logo}>s a v r</Text>
        <ScrollView contentContainerStyle={styles.scrollView}>

            <View>
            <View>
                <Text>{currentTrip.city}</Text>
                <View>
                    <Text>{currentTrip.start_date}</Text>
                    <Text>{currentTrip.end_date}</Text>
                </View>
            </View>
            <Text>${currentTrip.budget}</Text>
            <Image source={require('../assets/1024px-Donut-Chart.svg.png')} style={styles.graph}></Image>
            <Text>60% of your budget went to food. Yum!</Text>
            </View>



            {expenses.map((expense, index) => {
            if (expense.trip === currentTrip.id) {
                return (
                    <View key={index} style={styles.expense}>
                    <Text>{expense.expense_title}</Text>
                    <Text>${expense.price}</Text>

                    {/* {if (expense.category === 'food') {
                        return (
                            <Text>🍕</Text>
                        )
                    }} */}
                    
                    <Text>{expense.category}</Text>
                    </View>
                )
            }
            })}

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