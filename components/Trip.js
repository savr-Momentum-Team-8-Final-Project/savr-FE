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
  TouchableOpacity,
  Button
} from 'react-native';
import { requestLogout } from '../api.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const expenses = [
  {
    id: 1,
    user: 'admin',
    trip: 1,
    expense_title: 'Uber',
    amount: 1,
    price: '50.00',
    total_cost: 50.0,
    category: 'ticket',
    note: 'note1',
    date: '2021-08-07'
  },
  {
    id: 2,
    user: 'admin',
    trip: 1,
    expense_title: 'Museum Tickets',
    amount: 4,
    price: '25.00',
    total_cost: 100.0,
    category: 'grocery',
    note: 'note2',
    date: '2021-08-08'
  }
]

export default function Trip (props) {
  const { setSelectedTrip, selectedTrip } = props

  return (
    <>
      <Text style={styles.logo}>s a v r</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View>
          <Pressable
            style={styles.button1}
            onPress={() => setSelectedTrip(null)}
          >
            <Text style={styles.text1}>←</Text>
          </Pressable>

          <Text>{selectedTrip.city}</Text>
          <View>
            <Text>{selectedTrip.start_date}</Text>
            <Text>{selectedTrip.end_date}</Text>
          </View>
        </View>
        <Text>${selectedTrip.budget}</Text>
        <Image
          source={require('../assets/1024px-Donut-Chart.svg.png')}
          style={styles.graph}
        />
        <Text>60% of your budget went to food. Yum!</Text>

        <View style={styles.expense}>
          {expenses.map((expense, index) => {
            if (expense.date === '2021-08-07') {
              return (
                <View key={index}>
                  <Text>{expense.date}</Text>
                  <Text>
                    {expense.expense_title} ${expense.total_cost}
                  </Text>
                </View>
              )
            }
          })}
        </View>
        <View style={styles.expense}>
          {expenses.map((expense, index) => {
            if (expense.date === '2021-08-08') {
              return (
                <View key={index}>
                  <Text>{expense.date}</Text>
                  <Text>
                    {expense.expense_title} ${expense.total_cost}
                  </Text>
                </View>
              )
            }
          })}
        </View>
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
    padding: 10
  },
  button1: {
    width: 70,
    height: 30,
    borderRadius: 30,
    backgroundColor: '#00D64B',
    top: 0,
    left: -137,
    alignItems: 'center'
  },
  text1: {
    color: 'white',
    fontSize: 25
  }
})
