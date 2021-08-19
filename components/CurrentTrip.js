import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { requestTrips, requestExpenses } from '../api.js';
import CreateAnExpense from './CreateAnExpense';
import moment from 'moment';

export default function CurrentTrip () {
  // const { setSelectedTrip, selectedTrip } = props
  const [trips, setTrips] = useState([])
  const [expenses, setExpenses] = useState([])
  const [currentTrip, setCurrentTrip] = useState({})
  const [days, setDays] = useState()
  const [tripDates, setTripDates] = useState()
  const [addingExpense, setAddingExpense] = useState(false)

  let dates = []

  const today = moment().format('YYYY-MM-DD')

  useEffect(() => {
    requestTrips().then((data) => {
      setTrips(data.data)
    })
  }, [])

  useEffect(() => {
    const a = moment(currentTrip.end_date)
    let b = moment(currentTrip.start_date)
    setDays(a.diff(b, 'days') + 1)
  }, [currentTrip])

  useEffect(() => {
    if (days) {
      for (let step = 0; step < days; step++) {
        if (dates.length === 0) {
          dates.push(currentTrip.start_date)
        } else {
          const last = dates[dates.length - 1]
          const hey = moment(last).add(1, 'days').format('YYYY-MM-DD')
          dates.push(hey)
        }
      }
      setTripDates(dates)
    }
  }, [days])

  useEffect(() => {
    requestExpenses().then((data) => setExpenses(data.data))
  }, [addingExpense])

  useEffect(() => {
    trips.map((trip, index) => {
      if (
        moment(trip.start_date).isBefore(today) &&
        moment(trip.end_date).isAfter(today)
      ) {
        setCurrentTrip(trip)
      }
    })
  }, [trips])

  if (addingExpense) {
    return (
      <CreateAnExpense
        setAddingExpense={setAddingExpense}
        currentTrip={currentTrip}
      />
    )
  }

  return (
    <>
      <Text style={styles.logo}>s a v r</Text>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => setAddingExpense(true)}
        >
          <Text style={styles.text1}>+</Text>
        </TouchableOpacity>

        <View>
          <View>
            <Text>{currentTrip.city}</Text>
            <View>
              <Text>{currentTrip.start_date}</Text>
              <Text>{currentTrip.end_date}</Text>
            </View>
          </View>
          <Text>${currentTrip.budget}</Text>
          <Image
            source={require('../assets/1024px-Donut-Chart.svg.png')}
            style={styles.graph}
           />
          <Text>60% of your budget went to food. Yum!</Text>
        </View>

        {tripDates &&
          tripDates.map((date, index) => {
            return (
              <View key={index} style={styles.expense}>
                <Text>{date}</Text>
                {expenses.map((expense, index) => {
                  if (expense.trip === currentTrip.id) {
                    return (
                      <View key={index}>
                        <Text>{expense.expense_title}</Text>
                        <Text>${expense.price}</Text>

                        {/* {if (expense.category === 'food') {
                                    return (
                                        <Text>🍕</Text>
                                    )
                                }} */}

                        <Text>Category: {expense.category}</Text>
                      </View>
                    )
                  }
                })}
              </View>
            )
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
    padding: 10
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#00C244',
    bottom: 0,
    left: 140,
    alignItems: 'center'
  },
  text1: {
    color: 'white',
    fontSize: 38
  }
})
